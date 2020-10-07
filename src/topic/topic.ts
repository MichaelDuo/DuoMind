import {v4 as uuidv4} from 'uuid';
import MindMap from 'mindmap';

interface TopicData {
	id?: string;
	title: string;
	children: Array<Topic>;
	parent?: Topic;
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

	constructor(topicData: TopicData, mindmap: MindMap) {
		this.id = topicData.id ? topicData.id : uuidv4();
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = topicData.parent ? topicData.parent : null;
		this.mindmap = mindmap;
		this.mindmap.eventBus.register(this);
	}

	static fromJSON(topicJSON: any, mindmap: MindMap): Topic {
		let title: string = topicJSON.title;
		let children: Array<Topic> = [];

		let childrenArr: Array<any> = topicJSON.children;
		if (childrenArr && childrenArr.length) {
			children = childrenArr
				.map((v) => Topic.fromJSON({...v, parent: this}, mindmap))
				.filter((v) => v != null);
		}

		return new Topic({title, children}, mindmap);
	}

	public onAction(action: {type: string; payload?: any}): void {
		switch (action.type) {
			case 'select':
				this.topicEl.classList.add('selected');
				break;
			case 'deselect':
				this.topicEl.classList.remove('selected');
				break;
			default:
				console.log('Unhandled action: ', action);
				break;
		}
	}

	public printTitle(): void {
		console.log(this.title);
	}

	public getBox() {
		const rect = this.topicEl.getBoundingClientRect();
		return [rect.width, rect.height];
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
}

export default Topic;
