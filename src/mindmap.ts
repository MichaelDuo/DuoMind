import Topic from './topic';
import Layout from 'layout/layout';
import MapLayout from 'layout/layout-map';
import {MindMapI} from './types';

interface Config {
	data: any;
}
class MindMap extends MindMapI {
	layout: Layout;
	root: Topic;

	dom!: HTMLElement;
	board!: HTMLElement;
	connections!: HTMLElement;

	constructor(config: Config) {
		const {data} = config;
		super(data);
		this.root = Topic.fromJSON(data);
		this.layout = new MapLayout(this);
		// this.root.mount(this);
	}

	update() {
		/**
		 * this.renderer.update(this)
		 * update self
		 */
	}

	render() {
		// should only be called once
		// Get dom of it's children, and append to board

		// Listen to events
		this.dom = document.createElement('div');
		this.dom.classList.add('mindmap');
		this.board = document.createElement('div');
		this.board.classList.add('mindmap-board');
		this.connections = document.createElement('div');
		this.connections.classList.add('mindmap_connections');
		for (let e of [this.board, this.connections]) {
			this.dom.appendChild(e);
		}
		this.board.appendChild(this.root.render());
		// render children
		return this.dom;
	}

	mount(port: HTMLElement) {
		port.appendChild(this.render());
		// this.lifecycle.emit("mounted")

		this.layout.update(this.root);
		this.layout.centerMap();

		/**
		 * const rendered = this.renderer.render(this)
		 * port.appendChild(rendered)
		 * this.layout.update(this)
		 */
	}
}

export default MindMap;
