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
	mindmap: MindMap | null = null;
	parent: Topic | null;

	dom!: HTMLElement;
	topicEl!: HTMLElement;
	text!: HTMLElement;
	canvas!: HTMLCanvasElement;
	childrenContainer!: HTMLElement;

	constructor(topicData: TopicData) {
		this.id = topicData.id ? topicData.id : uuidv4();
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = topicData.parent ? topicData.parent : null;
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
		this.mindmap.board.appendChild(this.dom);
		for (let child of this.children) {
			child.mount(mindmap);
		}
	}

	public unmount() {
		this.dom.remove();
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
		// if (!this.isMounted()) {
		// 	throw new Error('Topic not mounted');
		// } else {
		// }
		const rect = this.topicEl.getBoundingClientRect();
		return [rect.width, rect.height];
		// return [this.topicEl.offsetWidth, this.topicEl.offsetHeight];
	}

	public render() {
		this.dom = document.createElement('div');
		this.topicEl = document.createElement('div');
		this.text = document.createElement('div');
		this.canvas = document.createElement('canvas');
		this.childrenContainer = document.createElement('div');

		this.dom.classList.add('topic-container');
		this.topicEl.classList.add('topic');
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
			this.childrenContainer.appendChild(child.render());
		}

		return this.dom;
	}
}

export default Topic;
