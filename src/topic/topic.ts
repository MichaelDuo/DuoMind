import {v4 as uuidv4} from 'uuid';
import MindMap from 'mindmap';
import {LayoutAble} from 'layout/types';

/**
      Topic Container, canvas
+-----------+---------------------+
|           |                     |
+--------+  |                     |
|  Topic |  | Children Container  |
+--------+  |                     |
|           |                     |
+-----------+---------------------+
 */

interface TopicData {
	id?: string;
	title: string;
	children: Array<Topic>;
}

class Topic implements LayoutAble {
	id: string;
	title: string;
	children: Array<Topic>;
	mindmap: MindMap;
	parent: Topic | null;

	dom!: HTMLElement;
	topicEl!: HTMLElement;
	text!: HTMLElement;
	dropArea!: HTMLElement;
	canvas!: HTMLCanvasElement;
	childrenContainer!: HTMLElement;
	editingWrapper!: HTMLElement;

	DOMEventHandlers: {[key: string]: (e: Event) => any};

	editing = false;

	constructor(
		topicData: TopicData,
		context: {mindmap: MindMap; parent: Topic | null}
	) {
		this.id = topicData.id ? topicData.id : uuidv4();
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = context.parent;
		this.mindmap = context.mindmap;
		this.mindmap.eventBus.register(this);
		this.DOMEventHandlers = this.getDOMEventHandlers();
	}

	static fromJSON(
		topicJSON: any,
		context: {mindmap: MindMap; parent: Topic | null}
	): Topic {
		const title: string = topicJSON.title;

		let children: Array<Topic> = [];

		const topic = new Topic({title, children}, context);

		const childrenArr: Array<any> = topicJSON.children;
		if (childrenArr && childrenArr.length) {
			children = childrenArr
				.map((v) =>
					Topic.fromJSON(
						{...v, parent: this},
						{mindmap: context.mindmap, parent: topic}
					)
				)
				.filter((v) => v != null);
		}

		topic.children = children;
		return topic;
	}

	public printTitle(): void {
		console.log(this.title);
	}

	public getBox() {
		// TODO: put in layout mode, then exit layout mode
		const rect = this.topicEl.getBoundingClientRect();
		return [rect.width, rect.height];
	}

	// Only remove from memory, and DOM, to fully remove, call destroy method
	public removeChild(child: Topic) {
		const idx = this.children.indexOf(child);
		if (idx >= 0) {
			this.children.splice(idx, 1);
		}
		child.dom.remove();
	}

	public initDom() {
		this.dom = document.createElement('div');
		this.topicEl = document.createElement('div');
		this.text = document.createElement('div');
		this.dropArea = document.createElement('div');
		this.canvas = document.createElement('canvas');
		this.childrenContainer = document.createElement('div');
		this.editingWrapper = document.createElement('div');

		this.dom.classList.add('topic-container');
		this.topicEl.classList.add('topic');
		this.topicEl.id = this.id;
		this.dropArea.classList.add('topic-drop-area');
		this.canvas.classList.add('branch-connections');
		this.childrenContainer.classList.add('topic-children-container');
		this.text.classList.add('topic-text');

		this.text.innerText = this.title;

		// make sure child have enough space to grow, the max-width is 200px
		this.dom.style.width = '200px';

		this.editingWrapper.appendChild(this.topicEl);
		this.dom.appendChild(this.canvas);
		this.dom.appendChild(this.childrenContainer);
		this.topicEl.appendChild(this.text);
		this.dom.appendChild(this.editingWrapper);
		this.dom.appendChild(this.dropArea);

		for (const child of this.children) {
			this.childrenContainer.appendChild(child.initDom());
		}

		return this.dom;
	}

	public destroy(emit = true) {
		if (this.parent) {
			for (const child of [...this.children]) {
				child.destroy(false);
			}
			this.mindmap.eventBus.unregister(this);
			this.parent.removeChild(this);
			this.dom.remove();
			if (emit) {
				this.mindmap.eventBus.emit('update');
				this.mindmap.eventBus.emit('destroyed:topic', this);
			}
		}
	}

	public onAction(action: {type: string; payload?: any}): void {
		switch (action.type) {
			case 'select':
				this.topicEl.classList.add('selected');
				break;
			case 'deselect':
				this.topicEl.classList.remove('selected');
				this.exitEditMode();
				break;
			case 'addChild':
				this.addChild();
				break;
			case 'addSibling':
				this.addSibling();
				break;
			case 'delete':
				this.destroy();
				break;
			case 'edit':
				this.enterEditMode();
				break;
			default:
				console.log('Unhandled action: ', action);
				break;
		}
	}

	public addChild(child?: Topic, index = -1) {
		if (!child) {
			child = new Topic(
				{
					title: 'New Topic',
					children: [],
				},
				{mindmap: this.mindmap, parent: this}
			);
		}
		this.children.push(child);
		this.childrenContainer.appendChild(child.initDom());
		this.mindmap.eventBus.emit('update');
		this.mindmap.eventBus.emit('new:topic', child);
	}

	public addSibling() {
		const newSibling = new Topic(
			{
				title: 'New Topic',
				children: [],
			},
			{mindmap: this.mindmap, parent: this.parent}
		);
		if (this.parent) {
			this.parent.children.splice(
				this.parent.children.indexOf(this) + 1,
				0,
				newSibling
			);
			this.parent.childrenContainer.appendChild(newSibling.initDom());
			this.mindmap.eventBus.emit('update');
			this.mindmap.eventBus.emit('new:topic', newSibling);
		}
	}

	public enterEditMode() {
		if (this.editing) return;
		this.editing = true;
		this.text.setAttribute('contenteditable', 'true');
		this.text.focus();
		this.topicEl.style.zIndex = '999';
		this.topicEl.classList.add('editing');

		// move cursor to last
		document.execCommand('selectAll', false);
		document.getSelection()?.collapseToEnd();

		this.attachEvents();
		this.enterFreeFlowMode();
	}

	public exitEditMode() {
		if (!this.editing) return;
		this.editing = false;
		this.title = this.text.textContent || '';
		this.text.removeAttribute('contenteditable');
		this.topicEl.style.removeProperty('z-index');
		this.topicEl.classList.remove('editing');

		this.mindmap.eventBus.emit('update');

		this.exitFreeFlowMode();
		this.detachEvents();
	}

	private enterFreeFlowMode() {
		this.editingWrapper.style.position = 'absolute';
		this.editingWrapper.style.width = '200px';
		for (const p of ['top', 'right', 'bottom', 'left']) {
			if (this.topicEl.style[p as any]) {
				this.editingWrapper.style[p as any] = '0px';
			}
		}
		this.editingWrapper.style.width =
			parseInt(this.dom.style.width) > 200
				? this.dom.style.width
				: '200px';
	}

	private exitFreeFlowMode() {
		for (const property of [
			'top',
			'right',
			'bottom',
			'left',
			'position',
			'width',
		]) {
			this.editingWrapper.style.removeProperty(property);
		}
	}

	private getDOMEventHandlers() {
		return {
			['keydown']: (e: Event) => {
				e.stopPropagation();
				if ((e as KeyboardEvent).key === 'Enter') {
					e.preventDefault();
					this.exitEditMode();
				}
			},
		};
	}

	private attachEvents() {
		for (const eventName in this.DOMEventHandlers) {
			this.dom.addEventListener(
				eventName,
				this.DOMEventHandlers[eventName]
			);
		}
	}

	private detachEvents() {
		for (const eventName in this.DOMEventHandlers) {
			this.dom.removeEventListener(
				eventName,
				this.DOMEventHandlers[eventName]
			);
		}
	}

	// getters
	public getId() {
		return this.id;
	}
	public getContainer() {
		return this.dom;
	}
	public getNode() {
		return this.topicEl;
	}
	public getChildrenContainer() {
		return this.childrenContainer;
	}
	public getCanvas() {
		return this.canvas;
	}
	public getChildren() {
		return this.children;
	}
	// public setDirection(direction: string) {
	// 	console.log(direction);
	// }

	// setters
}

export default Topic;
