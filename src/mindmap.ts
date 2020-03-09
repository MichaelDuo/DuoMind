import Topic from './topic';
import Layout from './layout';
import MapLayout from './layout-map';
class MindMap {
	layout: Layout;
	root: Topic;
	el: HTMLElement;

	constructor(data: any) {
		this.root = Topic.fromJSON(data);
		this.layout = new MapLayout();

		this.el = document.createElement('div');
		this.el.classList.add('mind-map');
	}

	mount(port: HTMLElement) {
		port.appendChild(this.el);
		this.root.mount(this.el);
		this.layout.update(this.root);
	}
}

export default MindMap;
