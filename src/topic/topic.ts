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
	public isRoot() {
		return this.parent == null;
	}

	public initDom() {
		// console.log(this.title);
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
		this.editingWrapper.classList.add('editing-wrapper');

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

	/* model operations */
	public insertChild(index: number, child?: Topic) {
		if (!child) {
			child = new Topic(
				{
					title: 'New Topic',
					children: [],
				},
				{mindmap: this.mindmap, parent: this}
			);
		}
		child.parent = this;
		this.children.splice(index, 0, child);
		this.childrenContainer.appendChild(child.initDom());
		this.mindmap.eventBus.emit('update');
		this.mindmap.eventBus.emit('new:topic', child);
	}

	public updateTitle(title: string) {
		this.title = title;
		this.enterFreeFlowMode();
		this.text.innerText = title;
		this.exitFreeFlowMode();
		this.mindmap.eventBus.emit('update');

		this.mindmap.eventBus.emit('MODEL_UPDATE', {
			action: 'SET_TITLE',
			payload: {
				path: this.getPath(),
				title: title,
			},
		});
	}

	public getPath(topic: Topic | null = this): number[] {
		const path: number[] = [];
		while (topic?.parent) {
			path.unshift(topic.parent.children.indexOf(topic));
			topic = topic.parent;
		}
		return path;
	}

	// Only remove from memory, and DOM, to fully remove, call destroy method
	public removeChild(child: Topic) {
		const idx = this.children.indexOf(child);
		if (idx >= 0) {
			this.children.splice(idx, 1);
		}
		child.dom.remove();
	}

	public addChild(child?: Topic, index = -1) {
		this.insertChild(this.children.length, child);
	}

	public addSibling(topic?: Topic, after = true) {
		this.parent?.insertChild(
			this.parent?.children.indexOf(this) + (after ? 1 : 0),
			topic
		);
	}

	// UI operations
	public onAction(action: {type: string; payload?: any}): void {
		switch (action.type) {
			case 'select':
				this.topicEl.classList.add('selected');
				break;
			case 'deselect':
				this.topicEl.classList.remove('selected');
				this.updateTitle(this.text.textContent || '');
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
		this.text.removeAttribute('contenteditable');
		this.topicEl.style.removeProperty('z-index');
		this.topicEl.classList.remove('editing');
		this.exitFreeFlowMode();
		this.detachEvents();
	}

	private enterFreeFlowMode() {
		// remove constrains
		this.topicEl.style.removeProperty('width');
		this.topicEl.style.removeProperty('height');

		// set wrapper
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
		// set constrains
		const rect = this.topicEl.getBoundingClientRect();
		this.topicEl.style.width = rect.width + 'px';
		this.topicEl.style.height = rect.height + 'px';

		// remove wrapper
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
					this.updateTitle(this.text.textContent || '');
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

	/* Util Methods */
	public printTitle(): void {
		console.log(this.title);
	}

	// public getBox() {
	// 	console.log('yo');
	// 	if (!this.topicEl.style.width || !this.topicEl.style.height) {
	// 		console.log('not hit');
	// 		const rect = this.topicEl.getBoundingClientRect();
	// 		this.topicEl.style.width = rect.width + 'px';
	// 		this.topicEl.style.height = rect.height + 'px';
	// 	}
	// 	return [
	// 		parseInt(this.topicEl.style.width),
	// 		parseInt(this.topicEl.style.height),
	// 	];
	// }

	public json(): any {
		return {
			title: this.title,
			children: this.children.map((child) => child.json()),
		};
	}

	public destroy() {
		if (this.parent) {
			for (const child of [...this.children]) {
				child.destroy();
			}
			this.mindmap.eventBus.unregister(this);
			this.parent.removeChild(this);
			this.dom.remove();
			this.mindmap.eventBus.emit('update');
		}
	}
}

export default Topic;
