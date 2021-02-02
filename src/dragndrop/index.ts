import MindMap from 'mindmap';
import Topic from 'topic';
import {getOffset} from 'utils';
import './styles.css';
import {throttle} from 'lodash';

class DragNDrop {
	mindmap: MindMap;

	dragSource: Topic | null = null;
	dropTarget: Topic | null = null;
	dropIndex: number | null = null;

	mode = '';
	ghost: HTMLElement | null = null;
	cursorPos: [number, number] = [0, 0];
	ghostPos: [number, number] = [0, 0];
	closest: Topic | null = null;
	dragState: {topic: Topic | null; op: string} = {topic: null, op: ''};

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
			this.mindmap.dom.addEventListener('mousedown', this);
		});
	}

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
		this.mindmap.dom.removeEventListener('mouseup', this);
		this.endDrag();
	}

	private startDrag(e: MouseEvent) {
		this.cursorPos[0] = e.clientX;
		this.cursorPos[1] = e.clientY;
	}

	private updateDrag(e: MouseEvent) {
		if (!this.dragSource) return;
		if (!this.ghost) {
			this.createGhost();
		}
		const dx = e.clientX - this.cursorPos[0];
		const dy = e.clientY - this.cursorPos[1];

		this.cursorPos[0] = e.clientX;
		this.cursorPos[1] = e.clientY;

		this.moveGhost(dx, dy);
		const dragState = this.getDragState();
		this.visualizeDragState(dragState);
	}

	private endDrag() {
		if (this.dragState.topic && this.dragSource) {
			switch (this.dragState.op) {
				case 'append':
					this.dragSource.parent?.removeChild(this.dragSource);
					this.dragState.topic.addChild(this.dragSource);
					break;
				case 'addSiblingBefore':
					this.dragSource.parent?.removeChild(this.dragSource);
					this.dragState.topic.addSibling(this.dragSource, false);
					break;
				case 'addSiblingAfter':
					this.dragSource.parent?.removeChild(this.dragSource);
					this.dragState.topic.addSibling(this.dragSource, true);
					break;
			}
		}

		this.reset();
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

	private getDragState(): any {
		if (!this.ghost || !this.dragSource) return;
		const closest = this.mindmap.getClosestTopic(
			this.cursorPos[0],
			this.cursorPos[1]
		);
		const target = closest.topic;

		const state: any = {
			topic: target,
			op: null,
		};

		let tmp: Topic | null = target;
		while (tmp && !tmp.isRoot()) {
			if (tmp == this.dragSource) return state;
			tmp = tmp.parent;
		}
		const targetRect = target.topicEl.getBoundingClientRect();

		if (
			this.cursorPos[0] >= targetRect.x &&
			this.cursorPos[0] <= targetRect.x + targetRect.width &&
			this.cursorPos[1] >= targetRect.y &&
			this.cursorPos[1] <= targetRect.y + targetRect.height
		) {
			state.op = 'append';
		} else if (this.cursorPos[1] < targetRect.y) {
			state.op = 'addSiblingBefore';
		} else if (this.cursorPos[1] > targetRect.y + targetRect.height) {
			state.op = 'addSiblingAfter';
		}

		return state;
	}

	private visualizeDragState(dragState: any) {
		if (this.dragState.topic) {
			this.dragState.topic.topicEl.classList.remove(this.dragState.op);
		}
		this.dragState = dragState;
		this.dragState.topic?.topicEl.classList.add(this.dragState.op);
	}

	private destroyGhost() {
		this.ghost?.parentNode?.removeChild(this.ghost);
		this.ghost = null;
		return;
	}

	private reset() {
		if (this.dragState.topic) {
			this.dragState.topic.topicEl.classList.remove(this.dragState.op);
		}
		this.dragState = {topic: null, op: ''};
		this.dragSource = null;
		this.destroyGhost();
	}
}

export default DragNDrop;
