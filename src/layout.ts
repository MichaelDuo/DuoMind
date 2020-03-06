import Topic from './topic';

class Layout {
	boxes: {
		[key: string]: number[];
	};

	constructor() {
		this.boxes = {};
	}

	update(topic: Topic) {
		this.updateBoxes(topic);
		let mapCenter = [200, 300];
		this.rightLayout(topic, mapCenter);
	}

	updateBoxes(topic: Topic) {
		let childrenBox = [0, 0];
		for (let child of topic.children) {
			this.updateBoxes(child);
			let childBox = this.boxes[child.id];
			childrenBox[0] = Math.max(childrenBox[0], childBox[0]);
			childrenBox[1] += childBox[1];
		}
		let topicBox = topic.getBox();
		let box = [
			childrenBox[0] + topicBox[0],
			Math.max(topicBox[1], childrenBox[1]),
		];
		this.boxes[topic.id] = box;
	}

	rightLayout(topic: Topic, pos: number[]) {
		let topicBox = topic.getBox();
		topic.el.style.left = pos[0] + 'px';
		topic.el.style.top = pos[1] - topicBox[1] / 2 + 'px';

		let top = pos[1] - this.boxes[topic.id][1] / 2;
		let offsetTop = 0;

		for (let child of topic.children) {
			let childBox = this.boxes[child.id];
			let childLeft = pos[0] + topicBox[0];
			// let childLeft = pos[0] - child.getBox()[0]; // for right layout
			let childTop = top + offsetTop + childBox[1] / 2;
			this.rightLayout(child, [childLeft, childTop]);
			offsetTop += childBox[1];
		}
	}
}

export default Layout;
