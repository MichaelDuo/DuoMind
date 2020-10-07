import Topic from './topic';
import Layout from 'layout/layout';
import MapLayout from 'layout/layout-map';
import Selections from 'selections';
import EventBus from 'eventbus';

interface Config {
	data: any;
}
class MindMap {
	layout: Layout;
	root: Topic;
	eventBus: EventBus;
	selections: Selections;

	dom!: HTMLElement;
	board!: HTMLElement;
	connections!: HTMLElement;

	constructor(config: Config) {
		const {data} = config;
		this.eventBus = new EventBus(this);
		this.selections = new Selections(this);
		this.layout = new MapLayout(this);

		this.root = Topic.fromJSON(data);

		this.render();
		this.init();
	}

	private init() {
		// init events
		// init selections
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

		// this.dom.addEventListener('click', (e) => {
		// 	console.log(e);
		// });
		return this.dom;
	}

	mount(port: HTMLElement) {
		// mount
		port.appendChild(this.dom);

		// TODO: emit mount event

		// layout map
		this.layout.update(this.root);

		// position map
		this.layout.centerMap();
	}
}

export default MindMap;
