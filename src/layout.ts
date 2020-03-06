import Topic from './topic';

class Layout {
	private bBoxes: {
		[key: string]: number[];
	};

	offsetChildren = 10;
	offsetSibling = 1;

	constructor() {
		this.bBoxes = {};
	}

	update(topic: Topic) {
		this.updateBBoxes(topic);
		let mapCenter = [300, 300];
		// this.layout(topic, mapCenter, 'right');
		this.layoutRoot(topic, mapCenter);
	}

	updateBBoxes(topic: Topic) {
		let childrenBBox = [0, 0];
		let offsetSibling = 0;
		for (let child of topic.children) {
			this.updateBBoxes(child);
			let childBox = this.bBoxes[child.id];
			childrenBBox[0] = Math.max(childrenBBox[0], childBox[0]);
			childrenBBox[1] += childBox[1] + offsetSibling;
			offsetSibling = this.offsetSibling;
		}
		let topicBox = topic.getBox();
		let box = [
			childrenBBox[0] + topicBox[0] + this.offsetChildren,
			Math.max(topicBox[1], childrenBBox[1]),
		];
		this.bBoxes[topic.id] = box;
	}

	layoutRoot(root: Topic, pos: number[]) {
		let topicBox = root.getBox();
		let bBox = this.bBoxes[root.id];
		root.el.style.left = pos[0] + 'px';
		root.el.style.top = pos[1] + 'px';

		let rightChildren = root.children.slice(0, root.children.length / 2);
		let leftChildren = root.children.slice(
			root.children.length / 2,
			root.children.length
		);

		let leftBBox = leftChildren.reduce(
			(prev, child) => [
				Math.max(prev[0], this.bBoxes[child.id][0]),
				prev[1] + this.bBoxes[child.id][1],
			],
			[0, 0]
		);

		let rightBBox = rightChildren.reduce(
			(prev, child) => [
				Math.max(prev[0], this.bBoxes[child.id][0]),
				prev[1] + this.bBoxes[child.id][1],
			],
			[0, 0]
		);

		// Right branches
		this.layoutChildren(
			rightChildren,
			[
				pos[0] + topicBox[0] + this.offsetChildren,
				pos[1] - rightBBox[1] / 2,
			],
			'right'
		);

		// Left branches
		this.layoutChildren(
			leftChildren,
			[pos[0] - this.offsetChildren, pos[1] - leftBBox[1] / 2],
			'left'
		);
	}

	layoutChildren(children: Topic[], pos: number[], direction = 'right') {
		let offsetTop = 0;
		let offsetSibling = 0;

		for (let child of children) {
			let childBBox = this.bBoxes[child.id];
			let childTopicBox = child.getBox();
			let offsetChildren = this.offsetChildren;
			let end = 0;

			let left = 0;

			if (direction == 'right') {
				left = pos[0];
				end = left + childTopicBox[0];
			} else if (direction == 'left') {
				left = pos[0] - childTopicBox[0];
				offsetChildren = -offsetChildren;

				end = left;
			}

			let top = pos[1] + offsetTop + offsetSibling + childBBox[1] / 2;

			child.el.style.left = left + 'px';
			child.el.style.top = top + 'px';

			offsetTop += childBBox[1] + offsetSibling;
			offsetSibling = this.offsetSibling;

			this.layoutChildren(
				child.children,
				[end + offsetChildren, top - childBBox[1] / 2],
				direction
			);
		}
	}
}

export default Layout;
