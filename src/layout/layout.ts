import Topic from 'topic';
import MindMap from 'mindmap';

class Layout {
	protected bBoxes: {
		[key: string]: number[];
	};

	offsetChildren = 20;
	offsetSibling = 1;
	mindmap: MindMap;

	constructor(mindmap: MindMap) {
		/* Topic's width and height with all it's children included */
		this.bBoxes = {}; // {id: [width, height]}
		this.mindmap = mindmap;
	}

	update(topic: Topic) {
		this.updateBBoxes(topic);
		let mapCenter = [600, 300];
		// this.layout(topic, mapCenter, 'right');
		this.layoutRoot(topic, mapCenter);
		this.drawConnections(topic);
	}

	layoutRoot(topic: Topic, pos: number[]) {
		// Implement by subclasses
	}

	// Update Branch Box
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

	getMapRect() {
		let root = this.mindmap.root;
		// get root BBox
		// get root postion
		// return [width, height]
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

			child.dom.style.left = left + 'px';
			child.dom.style.top = top + 'px';

			offsetTop += childBBox[1] + offsetSibling;
			offsetSibling = this.offsetSibling;

			this.layoutChildren(
				child.children,
				[end + offsetChildren, top - childBBox[1] / 2],
				direction
			);
		}
	}

	anchorCanvas(topic: Topic) {
		let bbox = this.bBoxes[topic.id];
		console.log(bbox);
		topic.canvas.width = bbox[0];
		topic.canvas.height = bbox[1];
		// topic.canvas.x =
	}

	drawConnections(topic: Topic) {
		this.anchorCanvas(topic);
		const ctx = topic.canvas.getContext('2d');
		console.log(ctx);
		if (!ctx) {
			console.error('Can not get context');
			return;
		}
		ctx.strokeStyle = 'rgb(0,200,0)';

		for (let child of topic.children) {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(100, 150);
			ctx.stroke();
		}
	}
}

export default Layout;
