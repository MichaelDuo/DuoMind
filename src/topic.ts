import {v4 as uuidv4} from 'uuid';
import MindMap from './mindmap';
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
	mindmap: MindMap | null = null;
	el: HTMLElement;
	content: HTMLElement;
	text: HTMLElement;
	parent: Topic | null;
	canvas: HTMLCanvasElement;

	constructor(topicData: TopicData) {
		this.id = topicData.id ? topicData.id : uuidv4();
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = topicData.parent ? topicData.parent : null;

		this.el = document.createElement('div');
		this.content = document.createElement('div');
		this.text = document.createElement('div');
		this.canvas = document.createElement('canvas');

		this.el.classList.add('topic');
		this.content.classList.add('topic-content');

		this.canvas.classList.add('branch-connections');

		this.text.innerText = topicData.title;

		this.el.appendChild(this.canvas);
		this.el.appendChild(this.content);
		this.content.appendChild(this.text);
	}

	static fromJSON(topicJSON: any): Topic {
		let title: string = topicJSON.title;
		let children: Array<Topic> = [];

		let childrenArr: Array<any> = topicJSON.children;
		if (childrenArr && childrenArr.length) {
			children = childrenArr
				.map((v) => Topic.fromJSON({...v, parent: this}))
				.filter((v) => v != null);
		}

		return new Topic({title, children});
	}

	public mount(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.mindmap.board.appendChild(this.el);
		for (let child of this.children) {
			child.mount(mindmap);
		}
	}

	public unmount() {
		this.el.remove();
		this.mindmap = null;
		for (let child of this.children) {
			child.unmount();
		}
	}

	public printTitle(): void {
		console.log(this.title);
	}

	public isMounted(): boolean {
		return this.mindmap != null;
	}

	public getBox() {
		if (!this.isMounted()) {
			throw new Error('Topic not mounted');
		} else {
			return [this.content.offsetWidth, this.content.offsetHeight];
		}
	}
}

export default Topic;
