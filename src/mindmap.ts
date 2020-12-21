import Topic from './topic';
import Layout from 'layout/layout';
import MapLayout from 'layout/layout-map';
import Selection from 'selection';
import EventBus from 'eventbus';
import CommandService from 'commands/command_service';
import makeMindmapCommands from 'commands/mindmap_commands';
import DragNDrop from 'dragndrop';
import {findTopicId} from 'utils';

interface Config {
	data: any;
}
class MindMap {
	layout: Layout;
	root: Topic;
	eventBus: EventBus;
	selection: Selection;
	dragNDrop: DragNDrop;

	dom!: HTMLElement;
	board!: HTMLElement;
	connections!: HTMLElement;

	private commandService: CommandService;
	private mindmapCommands: CommandService;

	constructor(config: Config) {
		const {data} = config;
		this.eventBus = new EventBus(this);
		this.layout = new MapLayout(this.dom);
		this.root = Topic.fromJSON(data, {mindmap: this, parent: null});
		this.initDom();
		this.selection = new Selection(this);
		this.dragNDrop = new DragNDrop(this);

		this.commandService = new CommandService();
		this.mindmapCommands = makeMindmapCommands(this);
		this.commandService.setDelegate(this.mindmapCommands);

		this.eventBus.initEvents();
		this.initEvents();
	}

	update() {
		/**
		 * this.renderer.update(this)
		 * update self
		 */
	}

	initDom() {
		this.dom = document.createElement('div');
		this.dom.classList.add('mindmap');
		this.board = document.createElement('div');
		this.board.classList.add('mindmap-board');
		this.connections = document.createElement('div');
		this.connections.classList.add('mindmap_connections');
		for (const e of [this.board, this.connections]) {
			this.dom.appendChild(e);
		}
		this.board.appendChild(this.root.initDom());
		return this.dom;
	}

	mount(port: HTMLElement) {
		// mount
		port.appendChild(this.dom);

		// TODO: emit mount event
		this.eventBus.emit('mounted');

		// layout map
		this.layout.update(this.root);

		// position map
		this.centerMap();
	}

	initEvents() {
		this.eventBus.on('keydown:Tab', ({event}: {event: Event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.commandService.exec('addChild');
		});

		this.eventBus.on('keydown:Backspace', ({event}: {event: Event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.commandService.exec('deleteSelection');
		});

		this.eventBus.on('keydown:Enter', ({event}: {event: Event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.commandService.exec('addSibling');
		});

		this.eventBus.on(
			'dblclick:topic',
			({event, topicId}: {event: Event; topicId: string}) => {
				event.preventDefault();
				event.stopPropagation();
				this.commandService.exec('editTopic', {topicId: topicId});
			}
		);

		this.eventBus.on('update', () => {
			this.layout.update(this.root);
			this.centerMap();
		});
	}

	centerMap() {
		const port = this.board;
		const portBox = port.getBoundingClientRect();
		const mapBox = this.root.dom.getBoundingClientRect();

		if (parseInt(this.root.dom.style.height) < portBox.height) {
			this.root.dom.style.top =
				port.offsetHeight / 2 - mapBox.height / 2 + 'px';
		} else {
			this.root.dom.style.top = '0px';
		}

		if (parseInt(this.root.dom.style.width) < portBox.width) {
			this.root.dom.style.left =
				port.offsetWidth / 2 - mapBox.width / 2 + 'px';
		} else {
			this.root.dom.style.left = '0px';
		}
	}

	setCommandDelegate(delegate: CommandService | null) {
		this.commandService.setDelegate(delegate);
	}

	restoreCommandDelegate() {
		this.commandService.setDelegate(this.mindmapCommands);
	}

	getTopicById(id: string) {
		return this.eventBus.topics[id];
	}

	getTopicFor(el: HTMLElement): Topic | null {
		const topicId = findTopicId(el);
		return topicId ? this.getTopicById(topicId) : null;
	}

	// relative to view port
	getClosestTopic(
		x: number,
		y: number
	): {topic: Topic; dy: number; dx: number} {
		const all: {topic: Topic; dx: number; dy: number}[] = [];

		function preorder(topic: Topic) {
			const rect = topic.topicEl.getBoundingClientRect();
			const dx = rect.left + rect.width / 2 - x;
			const dy = rect.top + rect.height / 2 - y;
			all.push({
				topic,
				dx,
				dy,
			});
			topic.children.forEach(preorder);
		}

		preorder(this.root);

		all.sort((a, b) => {
			const da = a.dx * a.dx + a.dy * a.dy;
			const db = b.dx * b.dx + b.dy * b.dy;
			return da - db;
		});

		return all[0];
	}
}

export default MindMap;
