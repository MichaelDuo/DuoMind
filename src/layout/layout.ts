import Topic from 'topic';
import MindMap from 'mindmap';
import {getOffset} from 'utils';

/**
      Topic Container, canvas
+-----------+---------------------+
|           |                     |
+--------+  |                     |
|  Topic |  | Children Container  |
+--------+  |                     |
|           |                     |
+-----------+---------------------+
 */

export interface LayoutAble {
	getContainer(): HTMLElement;
	getTopic(): HTMLElement;
	getChildrenContainer(): HTMLElement;
	getCanvas(): HTMLElement;
	getViewPort(): HTMLElement;
}

class Layout {
	protected bBoxes: {
		[key: string]: number[];
	};

	horizontalGap = 25; // Topic Horizontal Gap
	verticalGap = 15; // Topic Vertical Gap
	mindmap: MindMap;

	constructor(mindmap: MindMap) {
		/* Topic's width and height with all it's children included */
		this.bBoxes = {}; // {id: [width, height]}
		this.mindmap = mindmap;
		mindmap.eventBus.on('update', () => {
			this.update(mindmap.root);
		});
	}

	update(topic: Topic) {
		// this.updateBBoxes(topic);
		// let mapCenter = [600, 300];
		// // this.layout(topic, mapCenter, 'right');
		// this.layoutRoot(topic, mapCenter);
		// this.drawConnections(topic);
	}

	layoutRoot(topic: Topic, pos: number[]) {
		throw new Error('"layoutRoot" method should implement in subclass');
	}

	// @return: bounding box of layouted topic
	layoutTopic(topic: Topic, direction: 'left' | 'right') {
		// Reset styles
		for (const property of ['left', 'right']) {
			topic.dom.style.removeProperty(property);
			topic.topicEl.style.removeProperty(property);
			topic.childrenContainer.style.removeProperty(property);
		}

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
			const bbox = this.layoutTopic(child, direction);
			childrenTotalHeight += bbox[1] + verticalGap;
			childrenMaxWidth = Math.max(childrenMaxWidth, bbox[0]);
			bBoxes.push(bbox);
		}

		// position children
		let offsetTop = 0;
		for (let i = 0; i < topic.children.length; i++) {
			const child = topic.children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;

			// set container position
			child.dom.style[dirToCssKey[direction]] = 0 + 'px';
			child.dom.style.top = verticalGap + offsetTop + 'px';

			offsetTop += bBoxes[i][1] + verticalGap;
		}

		// calculate bbox
		let bboxWidth =
			topicBox[0] +
			(childrenMaxWidth ? childrenMaxWidth + this.horizontalGap : 0);
		let bboxHeight = Math.max(topicBox[1], childrenTotalHeight);

		// update bbox cache
		this.bBoxes[topic.id] = [bboxWidth, bboxHeight];

		// position topicEl
		topic.topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';
		topic.topicEl.style[dirToCssKey[direction]] = 0 + 'px';

		// set container dimension
		topic.dom.style.width = bboxWidth + 'px';
		topic.dom.style.height = bboxHeight + 'px';

		topic.childrenContainer.style.top =
			(bboxHeight - childrenTotalHeight) / 2 + 'px';
		topic.childrenContainer.style[dirToCssKey[direction]] =
			topicBox[0] + this.horizontalGap + 'px';
		topic.childrenContainer.style.width = childrenMaxWidth + 'px';
		topic.childrenContainer.style.height = childrenTotalHeight + 'px';

		return [bboxWidth, bboxHeight]; // width and height
	}

	centerMap() {
		const port = this.mindmap.board;
		this.mindmap.root.dom.style.left =
			port.offsetWidth / 2 -
			this.bBoxes[this.mindmap.root.id][0] / 2 +
			'px';
		this.mindmap.root.dom.style.top =
			port.offsetHeight / 2 -
			this.bBoxes[this.mindmap.root.id][1] / 2 +
			'px';
	}

	anchorCanvas(topic: Topic) {
		let bbox = this.bBoxes[topic.id];
		topic.canvas.width = bbox[0];
		topic.canvas.height = bbox[1];
		topic.canvas.style.left = '0px';
		topic.canvas.style.top = '0px';
	}

	drawConnections(topic: Topic) {
		this.anchorCanvas(topic);
		const ctx = topic.canvas.getContext('2d');

		if (!ctx) {
			console.error('Can not get context');
			return;
		}
		ctx.strokeStyle = 'rgba(143, 141, 125, 1)';

		const canvasRect = getOffset(topic.canvas, this.mindmap.dom);
		const topicRect = getOffset(topic.topicEl, this.mindmap.dom);

		const topicPos = [
			topicRect.left - canvasRect.left + topic.topicEl.offsetWidth / 2,
			topicRect.top - canvasRect.top + topic.topicEl.offsetHeight / 2,
		];

		for (let child of topic.children) {
			this.drawConnections(child);
			const childRect = getOffset(child.topicEl, this.mindmap.dom);

			const childPos = [
				childRect.left - canvasRect.left,
				childRect.top - canvasRect.top + child.topicEl.offsetHeight / 2,
			];

			ctx.beginPath();

			if (childPos[0] > topicPos[0]) {
				// right
				ctx.moveTo(topicPos[0], topicPos[1]); // topic center
				ctx.lineTo(childPos[0], childPos[1]); // child center
			} else {
				// left
				ctx.moveTo(topicPos[0], topicPos[1]); // topic center
				ctx.lineTo(
					childPos[0] + child.topicEl.offsetWidth,
					childPos[1]
				); // child center
			}
			ctx.stroke();
		}
	}
}

export default Layout;
