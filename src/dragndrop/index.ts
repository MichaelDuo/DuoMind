import {Droppable, Plugins, Draggable} from '@shopify/draggable';
import MindMap from 'mindmap';

class DragNDrop {
	mindmap: MindMap;
	droppable: Droppable | undefined;
	constructor(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.initEvents();
	}

	private initEvents() {
		this.mindmap.eventBus.on('mounted', () => {
			this.droppable = new Droppable(this.mindmap.dom, {
				draggable: '.topic',
				dropzone: '.topic-children-container, .topic',
				mirror: {
					constrainDimensions: true,
				},
			});

			// this.droppable.removePlugin(Plugins.)

			this.droppable.on('drag:start', this.dragStart.bind(this));
			this.droppable.on('droppable:dropped', this.dropped.bind(this));
		});

		this.mindmap.eventBus.on('new:topic', (topic: any) => {
			console.log('should add topic to container');
		});
	}

	private dragStart(e: any) {
		console.log('drag start');
	}

	private dropped(e: any) {
		// console.log(e.dropzone.classList);
		// if (e.dropzone.classList.contains('topic')) {
		// 	console.log('Drop on topic');
		// } else if (e.dropzone.classList.contains('topic-children-container')) {
		// 	console.log('Drop on children');
		// }
		e.cancel();
	}
}

export default DragNDrop;
