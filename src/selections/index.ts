import Mindmap from 'mindmap';
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
			let target = event.target as HTMLElement | null;
			while (target && target != this.mindmap.dom) {
				if (target.classList.contains('topic')) {
					this.makeSelection([target.id]);
					break;
				}
				target = target.parentNode as HTMLElement;
			}
		});
	}

	clearSelection() {
		for (let topicId of this.selection) {
			this.mindmap.eventBus.dispatch({topicId, type: 'select'});
		}
		this.selection = [];
	}

	makeSelection(topicIds: string[]) {
		this.clearSelection();
		this.selection = topicIds;
		for (let topicId of this.selection) {
			this.mindmap.eventBus.dispatch({topicId, type: 'deselect'});
		}
	}
}
