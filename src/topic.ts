import {v4 as uuidv4} from 'uuid';
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
	board: HTMLElement | null = null;
	el: HTMLElement;
	text: HTMLElement;
	parent: Topic | null;
	canvas: HTMLCanvasElement;

	constructor(topicData: TopicData) {
		this.id = topicData.id ? topicData.id : uuidv4();
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = topicData.parent ? topicData.parent : null;

		this.el = document.createElement('div');
		this.text = document.createElement('div');
		this.canvas = document.createElement('canvas');

		this.el.classList.add('topic');
		this.canvas.classList.add('branch-connections');

		this.text.innerText = topicData.title;

		this.el.appendChild(this.text);
		this.el.appendChild(this.canvas);
	}

	static fromJSON(topicJSON: any): Topic {
		let title: string = topicJSON.title;
		let children: Array<Topic> = [];

		let childrenArr: Array<any> = topicJSON.children;
		if (childrenArr && childrenArr.length) {
			children = childrenArr
				.map(v => Topic.fromJSON({...v, parent: this}))
				.filter(v => v != null);
		}

		return new Topic({title, children});
	}

	public mount(board: HTMLElement) {
		this.board = board;
		this.board.appendChild(this.el);
		for (let child of this.children) {
			child.mount(this.board);
		}
	}

	public unmount() {
		this.el.remove();
		this.board = null;
		for (let child of this.children) {
			child.unmount();
		}
	}

	public printTitle(): void {
		console.log(this.title);
	}

	public isMounted(): boolean {
		return this.board != null;
	}

	public getBox() {
		if (!this.isMounted()) {
			throw new Error('Topic not mounted');
		} else {
			return [this.el.offsetWidth, this.el.offsetHeight];
		}
	}
}

export default Topic;
