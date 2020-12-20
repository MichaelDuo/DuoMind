import {Droppable, Plugins, Draggable} from '@shopify/draggable';
import MindMap from 'mindmap';
import Topic from 'topic';
import {getOffset} from 'utils';
import './styles.css';
import {throttle} from 'lodash';

class DragNDrop {
	mindmap: MindMap;
	droppable: Droppable | undefined;

	dragSource: Topic | null = null;
	dropTarget: Topic | null = null;
	dropIndex: number | null = null;

	mode = '';
	ghost: HTMLElement | null = null;
	cursorPos: [number, number] = [0, 0];
	ghostPos: [number, number] = [0, 0];

	eventHandlers: {[key: string]: (e: MouseEvent) => any} = {
		mousedown: this.mousedown.bind(this),
		mousemove: throttle(this.mousemove.bind(this), 20),
		mouseup: this.mouseup.bind(this),
	};

	constructor(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.initEvents();
	}

	private initEvents() {
		this.mindmap.eventBus.on('mounted', () => {
			// this.droppable = new Droppable(this.mindmap.dom, {
			// 	draggable: '.topic',
			// 	dropzone: '.topic-children-container, .topic',
			// 	mirror: {
			// 		constrainDimensions: true,
			// 	},
			// 	delay: 200,
			// 	classes: {mirror: ['topic-mirror']} as any,
			// });

			// this.droppable.on('drag:start', this.dragStart.bind(this));
			// this.droppable.on('drag:stop', this.dragStop.bind(this));
			// this.droppable.on('droppable:dropped', this.dropped.bind(this));

			// this.mindmap.dom.addEventListener(
			// 	'mousedown',
			// 	this.mouseDown.bind(this)
			// );

			this.mindmap.dom.addEventListener('mousedown', this);
		});

		// this.mindmap.eventBus.on('new:topic', (topic: any) => {
		// 	console.log('should add topic to container');
		// });
	}

	// private dragStart(e: any) {
	// 	this.mindmap.dom.classList.add('dragging');
	// }

	// private dragStop(e: any) {
	// 	this.mindmap.dom.classList.remove('dragging');

	// 	if (this.dragSource && this.dropTarget) {
	// 		this.dragSource.parent?.removeChild(this.dragSource);
	// 		this.dropTarget.addChild(this.dragSource);
	// 	}
	// }

	// private dropped(e: any) {
	// 	if (e.dropzone.classList.contains('topic')) {
	// 		this.dragSource = this.mindmap.getTopicById(e.dragEvent.source.id);
	// 		this.dropTarget = this.mindmap.getTopicById(e.dropzone.id);
	// 	} else if (e.dropzone.classList.contains('topic-children-container')) {
	// 		console.log('Drop on children');
	// 	}
	// 	e.cancel();
	// }

	public handleEvent(e: MouseEvent) {
		if (this.eventHandlers[e.type]) {
			this.eventHandlers[e.type](e);
		}
	}

	public mousedown(e: MouseEvent) {
		const topic = this.mindmap.getTopicFor(e.target as HTMLElement);
		if (!topic) return;
		e.preventDefault();

		this.dragSource = topic;
		this.startDrag(e);

		this.mindmap.dom.addEventListener('mousemove', this);
		this.mindmap.dom.addEventListener('mouseup', this);
	}

	public mousemove(e: MouseEvent) {
		this.updateDrag(e);
	}

	public mouseup(e: MouseEvent) {
		this.mindmap.dom.removeEventListener('mousemove', this);
		this.endDrag();
	}

	private startDrag(e: MouseEvent) {
		this.cursorPos[0] = e.clientX;
		this.cursorPos[1] = e.clientY;
	}

	private updateDrag(e: MouseEvent) {
		if (!this.dragSource) return;
		// console.log(this.)
		if (!this.ghost) {
			this.createGhost();
		}
		const dx = e.clientX - this.cursorPos[0];
		const dy = e.clientY - this.cursorPos[1];

		this.cursorPos[0] = e.clientX;
		this.cursorPos[1] = e.clientY;

		this.moveGhost(dx, dy);
	}

	private endDrag() {
		this.destroyGhost();
		this.dragSource = null;
	}

	private createGhost() {
		if (!this.dragSource) return;
		this.ghost = this.dragSource.topicEl.cloneNode(true) as HTMLElement;
		this.ghost.classList.add('ghost');
		this.mindmap.dom.appendChild(this.ghost);
		const offsets = getOffset(this.dragSource.topicEl, this.mindmap.dom);
		this.ghostPos = [offsets.left, offsets.top];
		this.ghost.style.removeProperty('right');
		this.ghost.style.removeProperty('bottom');
		this.ghost.style.left = offsets.left + 'px';
		this.ghost.style.top = offsets.top + 'px';
		return;
	}

	private moveGhost(dx: number, dy: number) {
		if (!this.ghost) return;
		this.ghostPos[0] += dx;
		this.ghostPos[1] += dy;
		this.ghost.style.left = this.ghostPos[0] + 'px';
		this.ghost.style.top = this.ghostPos[1] + 'px';
		return;
	}

	private destroyGhost() {
		this.ghost?.parentNode?.removeChild(this.ghost);
		this.ghost = null;
		return;
	}
}

export default DragNDrop;
