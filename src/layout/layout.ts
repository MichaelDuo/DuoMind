import {getOffset} from 'utils';
import {LayoutAble} from './types';

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

abstract class Layout {
	protected bBoxes: {
		[key: string]: number[];
	};

	horizontalGap = 25; // Topic Horizontal Gap
	verticalGap = 15; // Topic Vertical Gap
	viewPort: HTMLElement;

	constructor(viewPort: HTMLElement) {
		/* Topic's width and height with all it's children included */
		this.bBoxes = {}; // {id: [width, height]}
		this.viewPort = viewPort;
	}

	update(topic: LayoutAble) {
		// this.updateBBoxes(topic);
		// let mapCenter = [600, 300];
		// // this.layout(topic, mapCenter, 'right');
		// this.layoutRoot(topic, mapCenter);
		// this.drawConnections(topic);
	}

	layoutRoot(topic: LayoutAble, pos: number[]) {
		throw new Error('"layoutRoot" method should implement in subclass');
	}

	// @return: bounding box of layouted topic
	layoutTopic(topic: LayoutAble, direction: 'left' | 'right') {
		const container = topic.getContainer();
		const topicEl = topic.getNode();
		const childrenContainer = topic.getChildrenContainer();
		const children = topic.getChildren();
		const topicId = topic.getId();

		// Reset styles
		for (const property of ['left', 'right']) {
			container.style.removeProperty(property);
			topicEl.style.removeProperty(property);
			childrenContainer.style.removeProperty(property);
		}

		const topicBox = this.getBox(topic);

		const dirToCssKey: {[key: string]: 'left' | 'right'} = {
			right: 'left',
			left: 'right',
		};

		// layout children and get children dimension context
		let childrenMaxWidth = 0;
		let childrenTotalHeight = 0;
		const bBoxes = [];
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const bbox = this.layoutTopic(child, direction);
			childrenTotalHeight += bbox[1] + verticalGap;
			childrenMaxWidth = Math.max(childrenMaxWidth, bbox[0]);
			bBoxes.push(bbox);
		}

		// position children
		let offsetTop = 0;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const verticalGap = i == 0 ? 0 : this.verticalGap;

			const childContainer = child.getContainer();
			// set container position
			childContainer.style[dirToCssKey[direction]] = 0 + 'px';
			childContainer.style.top = verticalGap + offsetTop + 'px';

			offsetTop += bBoxes[i][1] + verticalGap;
		}

		// calculate bbox
		const bboxWidth =
			topicBox[0] +
			(childrenMaxWidth ? childrenMaxWidth + this.horizontalGap : 0);
		const bboxHeight = Math.max(topicBox[1], childrenTotalHeight);

		// update bbox cache
		this.bBoxes[topicId] = [bboxWidth, bboxHeight];

		// position topicEl
		topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';
		topicEl.style[dirToCssKey[direction]] = 0 + 'px';

		// set container dimension
		container.style.width = bboxWidth + 'px';
		container.style.height = bboxHeight + 'px';

		childrenContainer.style.top =
			(bboxHeight - childrenTotalHeight) / 2 + 'px';
		childrenContainer.style[dirToCssKey[direction]] =
			topicBox[0] + this.horizontalGap + 'px';
		childrenContainer.style.width = childrenMaxWidth + 'px';
		childrenContainer.style.height = childrenTotalHeight + 'px';

		return [bboxWidth, bboxHeight]; // width and height
	}

	anchorCanvas(node: LayoutAble) {
		const bbox = this.bBoxes[node.getId()];
		const canvas = node.getCanvas();
		canvas.width = bbox[0];
		canvas.height = bbox[1];
		canvas.style.left = '0px';
		canvas.style.top = '0px';
	}

	drawConnections(component: LayoutAble) {
		this.anchorCanvas(component);
		const viewPort = this.viewPort;
		const canvas = component.getCanvas();
		const node = component.getNode();
		const ctx = canvas.getContext('2d');
		const children = component.getChildren();

		if (!ctx) {
			console.error('Can not get context');
			return;
		}
		ctx.strokeStyle = 'rgba(143, 141, 125, 1)';

		const canvasRect = getOffset(canvas, viewPort);
		const topicRect = getOffset(node, viewPort);

		const topicPos = [
			topicRect.left - canvasRect.left + node.offsetWidth / 2,
			topicRect.top - canvasRect.top + node.offsetHeight / 2,
		];

		for (const child of children) {
			this.drawConnections(child);
			const childRect = getOffset(child.getNode(), viewPort);

			const childPos = [
				childRect.left - canvasRect.left,
				childRect.top -
					canvasRect.top +
					child.getNode().offsetHeight / 2,
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
					childPos[0] + child.getNode().offsetWidth,
					childPos[1]
				); // child center
			}
			ctx.stroke();
		}
	}

	protected getBox(component: LayoutAble) {
		const rect = component.getNode().getBoundingClientRect();
		return [rect.width, rect.height];
	}
}

export default Layout;
