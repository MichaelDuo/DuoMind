import Topic from 'topic';
import MindMap from 'mindmap';

class Layout {
	protected bBoxes: {
		[key: string]: number[];
	};

	horizontalGap = 20; // Topic Horizontal Gap
	verticalGap = 1; // Topic Vertical Gap
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
			offsetSibling = this.verticalGap;
		}
		let topicBox = topic.getBox();
		let box = [
			childrenBBox[0] + topicBox[0] + this.horizontalGap,
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

	/*
		pos is an array of 2, which is the start point of the children layout box
	*/
	layoutChildren(children: Topic[], pos: number[], direction = 'right') {
		const leftStart = pos[0];
		const topStart = pos[1];

		let offsetTop = 0; // cumulated top offset

		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			let childBBox = this.bBoxes[child.id];
			let childTopicBox = child.getBox();

			if (direction == 'right') {
				// child.childrenContainer.style.left = this.horizontalGap + 'px';
				const top =
					topStart + offsetTop + verticalGap + childBBox[1] / 2;

				this.layoutChildren(
					child.children,
					[childTopicBox[0] + this.horizontalGap, -childBBox[1] / 2],
					direction
				);

				offsetTop += childBBox[1] + verticalGap;

				// update dom
				child.dom.style.left = leftStart + 'px';
				child.dom.style.top = top + 'px';
			} else if (direction == 'left') {
				const top =
					topStart + offsetTop + verticalGap + childBBox[1] / 2;

				this.layoutChildren(
					child.children,
					[-this.horizontalGap, -childBBox[1] / 2],
					direction
				);

				offsetTop += childBBox[1] + verticalGap;

				// update dom
				child.dom.style.left = pos[0] - childTopicBox[0] + 'px';
				child.dom.style.top = top + 'px';
			}
		}
	}

	// @return: bounding box of layouted topic
	layout2(topic: Topic, direction: 'left' | 'right') {
		let topicBox = topic.getBox();

		let dirToCssKey: {[key: string]: 'left' | 'right'} = {
			right: 'left',
			left: 'right',
		};

		// layout children and get children dimension context
		let childrenMaxWidth = 0;
		let childrenTotalHeight = 0;
		let bBoxes = [];
		for (let i = 0; i < topic.children.length; i++) {
			const child = topic.children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const bbox = this.layout2(child, direction);
			childrenTotalHeight += bbox[1] + verticalGap;
			childrenMaxWidth = Math.max(childrenMaxWidth, bbox[0]);
			bBoxes.push(bbox);
		}

		let offsetTop = 0;
		for (let i = 0; i < topic.children.length; i++) {
			const child = topic.children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;

			// set container position
			child.dom.style[dirToCssKey[direction]] = 0 + 'px';
			child.dom.style.top = verticalGap + offsetTop + 'px';

			offsetTop += bBoxes[i][1] + verticalGap;
		}

		// layout children in topic context
		let bboxWidth =
			topicBox[0] +
			(childrenMaxWidth ? childrenMaxWidth + this.horizontalGap : 0);
		let bboxHeight = Math.max(topicBox[1], childrenTotalHeight);

		topic.topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';
		topic.topicEl.style[dirToCssKey[direction]] = 0 + 'px';

		topic.dom.style.width = bboxWidth + 'px';
		topic.dom.style.height = bboxHeight + 'px';

		// set children container dimensions
		topic.childrenContainer.style.top = '0px';
		topic.childrenContainer.style[dirToCssKey[direction]] =
			topicBox[0] + this.horizontalGap + 'px';
		topic.childrenContainer.style.width = childrenMaxWidth + 'px';
		topic.childrenContainer.style.height = childrenTotalHeight + 'px';

		return [bboxWidth, bboxHeight]; // width and height
	}

	anchorCanvas(topic: Topic) {
		let bbox = this.bBoxes[topic.id];
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
