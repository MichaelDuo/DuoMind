import Topic from './topic';
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
		let topicBox = root.getBox();
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

		// TODO: get position of root
		// x: leftBBox[0] + offset
		// y: max(leftBBox[1], rightBBox[1]) / 2 - root.box.height/2

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
}

export default MapLayout;
