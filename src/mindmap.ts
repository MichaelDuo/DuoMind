import Topic from './topic';
import Layout from 'layout/layout';
import MapLayout from 'layout/layout-map';
import Selection from 'selection';
import EventBus from 'eventbus';
import CommandService from 'commands/command_service';
import makeMindmapCommands from 'commands/mindmap_commands';

interface Config {
	data: any;
}
class MindMap {
	layout: Layout;
	root: Topic;
	eventBus: EventBus;
	selection: Selection;

	dom!: HTMLElement;
	board!: HTMLElement;
	connections!: HTMLElement;

	private commandService: CommandService;
	private mindmapCommands: CommandService;

	constructor(config: Config) {
		const {data} = config;
		this.eventBus = new EventBus(this);
		this.layout = new MapLayout(this);
		this.root = Topic.fromJSON(data, {mindmap: this, parent: null});
		this.initDom();
		this.selection = new Selection(this);

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
		this.layout.centerMap();
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
	}

	setCommandDelegate(delegate: CommandService | null) {
		this.commandService.setDelegate(delegate);
	}

	restoreCommandDelegate() {
		this.commandService.setDelegate(this.mindmapCommands);
	}
}

export default MindMap;
