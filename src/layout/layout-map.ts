import Topic from 'topic';
import Layout from './layout';

class MapLayout extends Layout {
	update(root: Topic) {
		this.updateBBoxes(root);
		let mapCenter = [600, 300];
		this.layoutRoot(root, mapCenter);
		this.drawConnections(root);
	}

	updateBBoxes(root: Topic) {
		super.updateBBoxes(root);
		let topicBox = root.getBox();
		// this.bBoxes[root.id] =
	}

	layoutRoot(root: Topic, pos: number[]) {
		const bbox = this.layout2(root, 'right');
		// this.layout2(root.children[0], 'right');
		root.dom.style.left = '300px';
		root.dom.style.top = '300px';
		// console.log(bbox);
		return;
		let topicBox = root.getBox();
		root.dom.style.left = pos[0] + 'px';
		root.dom.style.top = pos[1] + 'px';

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
			[topicBox[0] + this.horizontalGap, -rightBBox[1] / 2],
			'right'
		);

		// Left branches
		this.layoutChildren(
			leftChildren,
			[-this.horizontalGap, -leftBBox[1] / 2],
			'left'
		);
	}
}

export default MapLayout;
