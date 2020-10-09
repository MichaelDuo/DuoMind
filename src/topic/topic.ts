import {v4 as uuidv4} from 'uuid';
import MindMap from 'mindmap';

interface TopicData {
	id?: string;
	title: string;
	children: Array<Topic>;
}

class Topic {
	id: string;
	title: string;
	children: Array<Topic>;
	mindmap: MindMap;
	parent: Topic | null;

	dom!: HTMLElement;
	topicEl!: HTMLElement;
	text!: HTMLElement;
	canvas!: HTMLCanvasElement;
	childrenContainer!: HTMLElement;

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
	}

	static fromJSON(
		topicJSON: any,
		context: {mindmap: MindMap; parent: Topic | null}
	): Topic {
		let title: string = topicJSON.title;

		let children: Array<Topic> = [];

		const topic = new Topic({title, children}, context);

		let childrenArr: Array<any> = topicJSON.children;
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
		const rect = this.topicEl.getBoundingClientRect();
		return [rect.width, rect.height];
	}

	// Only remove from memory, to fully remove, call destroy method
	public removeChild(child: Topic) {
		const idx = this.children.indexOf(child);
		if (idx >= 0) {
			this.children.splice(idx, 1);
		}
	}

	public initDom() {
		this.dom = document.createElement('div');
		this.topicEl = document.createElement('div');
		this.text = document.createElement('div');
		this.canvas = document.createElement('canvas');
		this.childrenContainer = document.createElement('div');

		this.dom.classList.add('topic-container');
		this.topicEl.classList.add('topic');
		this.topicEl.id = this.id;
		this.canvas.classList.add('branch-connections');
		this.childrenContainer.classList.add('topic-children-container');

		this.text.innerText = this.title;

		// make sure child have enough space to grow, the max-width is 200px
		this.dom.style.width = '500px';
		this.dom.style.height = '500px';

		this.dom.appendChild(this.topicEl);
		this.dom.appendChild(this.canvas);
		this.dom.appendChild(this.childrenContainer);
		this.topicEl.appendChild(this.text);

		for (let child of this.children) {
			this.childrenContainer.appendChild(child.initDom());
		}

		return this.dom;
	}

	public destroy(emit = true) {
		if (this.parent) {
			for (let child of [...this.children]) {
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

	public addChild() {
		const newChild = new Topic(
			{
				title: 'New Topic',
				children: [],
			},
			{mindmap: this.mindmap, parent: this}
		);
		this.children.push(newChild);
		this.childrenContainer.appendChild(newChild.initDom());
		this.mindmap.eventBus.emit('update');
		this.mindmap.eventBus.emit('new:topic', newChild);
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
		this.topicEl.style.zIndex = '999';
		// this.mindmap.eventBus.on('keydown:Enter', () => {
		// 	console.log('save');
		// 	this.exitEditMode();
		// });
	}

	public exitEditMode() {
		if (!this.editing) return;
		this.editing = false;
		this.text.removeAttribute('contenteditable');
		this.topicEl.style.removeProperty('z-index');
		this.mindmap.eventBus.emit('update');
	}
}

export default Topic;
