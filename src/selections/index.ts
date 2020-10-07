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
			let found = false;
			let target = event.target as HTMLElement | null;
			while (target && target != this.mindmap.dom) {
				if (target.classList.contains('topic')) {
					found = true;
					break;
				}
				target = target.parentNode as HTMLElement;
			}

			this.clearSelection();
			if (found) {
				this.selection = [target!.id];
				// TODO: Dispatch actions
			}
		});
	}

	clearSelection() {
		for (let topicId of this.selection) {
			// TODO: Dispatch actions
			console.log(`Clear selection of topicId: ${topicId}`);
		}
		this.selection = [];
	}
}
