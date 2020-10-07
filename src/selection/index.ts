import Mindmap from 'mindmap';
import Topic from 'topic';
export default class Selections {
	mindmap: Mindmap;
	selection: string[];

	constructor(mindmap: Mindmap) {
		this.mindmap = mindmap;
		this.selection = [];
		this.initEvents();
	}

	initEvents() {
		this.mindmap.dom.addEventListener('click', (event) => {
			let found = false;
			let target = event.target as HTMLElement | null;
			while (target && target != this.mindmap.dom) {
				if (target.classList.contains('topic')) {
					found = true;
					break;
				}
				target = target.parentNode as HTMLElement;
			}
			if (found) {
				this.makeSelection([target!.id]);
			} else {
				this.clearSelection();
			}
		});

		this.mindmap.eventBus.on('new:topic', (topic: Topic) => {
			this.makeSelection([topic.id]);
		});
	}

	clearSelection() {
		for (let topicId of this.selection) {
			this.mindmap.eventBus.dispatch({topicId, type: 'deselect'});
		}
		this.selection = [];
	}

	makeSelection(topicIds: string[]) {
		this.clearSelection();
		this.selection = topicIds;
		for (let topicId of this.selection) {
			this.mindmap.eventBus.dispatch({topicId, type: 'select'});
		}
	}
}
