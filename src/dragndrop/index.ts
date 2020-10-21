import {Droppable} from '@shopify/draggable';
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
				dropzone: '.topic-container',
			});

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
		e.cancel();
	}
}

export default DragNDrop;
