import {Droppable, Plugins, Draggable} from '@shopify/draggable';
import MindMap from 'mindmap';
import Topic from 'topic';

class DragNDrop {
	mindmap: MindMap;
	droppable: Droppable | undefined;

	dragSource: Topic | null = null;
	dropTarget: Topic | null = null;
	dropIndex: number | null = null;

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
				delay: 200,
				classes: {mirror: ['topic-mirror']} as any,
			});

			this.droppable.on('drag:start', this.dragStart.bind(this));
			this.droppable.on('drag:stop', this.dragStop.bind(this));
			this.droppable.on('droppable:dropped', this.dropped.bind(this));
		});

		this.mindmap.eventBus.on('new:topic', (topic: any) => {
			console.log('should add topic to container');
		});
	}

	private dragStart(e: any) {
		console.log('drag start');
		this.mindmap.dom.classList.add('dragging');
	}

	private dragStop(e: any) {
		this.mindmap.dom.classList.remove('dragging');
		console.log('Drag Source: ', this.dragSource);
		console.log('Drop Target: ', this.dropTarget);

		if (this.dragSource && this.dropTarget) {
			this.dragSource.parent?.removeChild(this.dragSource);
			this.dropTarget.addChild(this.dragSource);
		}
	}

	private dropped(e: any) {
		if (e.dropzone.classList.contains('topic')) {
			this.dragSource = this.mindmap.getTopicById(e.dragEvent.source.id);
			this.dropTarget = this.mindmap.getTopicById(e.dropzone.id);
		} else if (e.dropzone.classList.contains('topic-children-container')) {
			console.log('Drop on children');
		}
		e.cancel();
	}
}

export default DragNDrop;
