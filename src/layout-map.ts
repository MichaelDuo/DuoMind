import Topic from './topic';
import Layout from './layout';

class MapLayout extends Layout {
	update(topic: Topic) {
		this.updateBBoxes(topic);
		let mapCenter = [600, 300];
		// this.layout(topic, mapCenter, 'right');
		this.layoutRoot(topic, mapCenter);
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
