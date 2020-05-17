import Topic from './topic';
import Layout from './layout';
import MapLayout from './layout-map';
import {MindMapI} from './types';
class MindMap extends MindMapI {
	layout: Layout;
	root: Topic;
	el: HTMLElement;
	board: HTMLElement;
	connections: HTMLElement;

	constructor(data: any) {
		super(data);
		this.root = Topic.fromJSON(data);
		this.layout = new MapLayout(this);
		this.el = document.createElement('div');
		this.el.classList.add('mind-map');
		this.board = document.createElement('div');
		this.board.classList.add('mind-map_board');
		this.connections = document.createElement('div');
		this.connections.classList.add('mind-map_connections');
		for (let e of [this.board, this.connections]) {
			this.el.appendChild(e);
		}
		this.root.mount(this);
	}

	mount(port: HTMLElement) {
		port.appendChild(this.el);
		this.layout.update(this.root);
	}
}

export default MindMap;
