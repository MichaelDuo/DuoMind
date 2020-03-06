interface TopicData {
	title: string;
	children: Array<Topic>;
	parent?: Topic;
}

class Topic {
	title: string;
	children: Array<Topic>;
	board: HTMLElement | null = null;
	el: HTMLElement;
	text: HTMLElement;
	parent: Topic | null;

	constructor(topicData: TopicData) {
		this.title = topicData.title;
		this.children = topicData.children;
		this.parent = topicData.parent ? topicData.parent : null;

		this.el = document.createElement('div');
		this.text = document.createElement('div');

		this.el.classList.add('topic');

		this.text.innerText = topicData.title;

		this.el.appendChild(this.text);
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
}

export default Topic;
