import Layout from './layout';
import {LayoutAble} from './types';
// import {throttle} from 'lodash';

class MapLayout extends Layout {
	update(root: LayoutAble) {
		// console.log('update');
		this.layoutRoot(root);
		this.drawConnections(root);
		// this.centerMap();
	}

	layoutRoot(root: LayoutAble) {
		const container = root.getContainer();
		const topicEl = root.getNode();
		const childrenContainer = root.getChildrenContainer();
		const children = root.getChildren();
		const topicId = root.getId();

		const LRSplitIndex = Math.floor(children.length / 2);
		const rightChildren = children.slice(0, LRSplitIndex);
		const leftChildren = children.slice(LRSplitIndex, children.length);

		let RWidth = 0,
			RHeight = 0;
		const RBBoxes = [];

		for (let i = 0; i < rightChildren.length; i++) {
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const bbox = this.layoutTopic(rightChildren[i], 'right');
			RWidth = Math.max(RWidth, bbox[0]);
			RHeight += verticalGap + bbox[1]; // need to add vertical
			RBBoxes.push(bbox);
		}

		let LHeight = 0,
			LWidth = 0;
		const LBBoxes = [];

		for (let i = 0; i < leftChildren.length; i++) {
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const bbox = this.layoutTopic(leftChildren[i], 'left');
			LWidth = Math.max(LWidth, bbox[0]);
			LHeight += verticalGap + bbox[1]; // need to add vertical
			LBBoxes.push(bbox);
		}

		const topicBox = this.getBox(root);

		const RhorizontalGap = RWidth ? this.horizontalGap : 0;
		const LhorizontalGap = LWidth ? this.horizontalGap : 0;
		// calculate bbox
		const bboxWidth =
			topicBox[0] + LWidth + RWidth + RhorizontalGap + LhorizontalGap;
		const bboxHeight = Math.max(topicBox[1], RHeight, LHeight);

		// update bbox cache
		this.bBoxes[topicId] = [bboxWidth, bboxHeight];

		// position topicEl
		topicEl.style.left = LWidth + (LWidth ? this.horizontalGap : 0) + 'px';
		topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';

		// position right children
		let offsetTop = (bboxHeight - RHeight) / 2;
		for (let i = 0; i < rightChildren.length; i++) {
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const child = rightChildren[i];
			child.getContainer().style.left =
				LWidth + RhorizontalGap + LhorizontalGap + topicBox[0] + 'px';
			child.getContainer().style.top = verticalGap + offsetTop + 'px';
			offsetTop += verticalGap + RBBoxes[i][1];
		}

		// position left children
		offsetTop = (bboxHeight - LHeight) / 2;
		for (let i = 0; i < leftChildren.length; i++) {
			const verticalGap = i == 0 ? 0 : this.verticalGap;
			const child = leftChildren[i];
			child.getContainer().style.right =
				RWidth + RhorizontalGap + LhorizontalGap + topicBox[0] + 'px';
			+'px';
			child.getContainer().style.top = verticalGap + offsetTop + 'px';
			offsetTop += verticalGap + LBBoxes[i][1];
		}

		// set dimensions
		container.style.width = bboxWidth + 'px';
		container.style.height = bboxHeight + 'px';
		childrenContainer.style.width = bboxWidth + 'px';
		childrenContainer.style.height = bboxHeight + 'px';
		return [bboxWidth, bboxHeight];
	}
}

export default MapLayout;
