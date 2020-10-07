import MindMap from 'mindmap';
class Commands {
	mindmap: MindMap;
	constructor(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.initEvents();
	}

	initEvents() {
		const interestedKeys = new Set(['Tab', 'Backspace', 'Enter']);
		document.addEventListener('keydown', (e) => {
			if (interestedKeys.has(e.key)) {
				e.preventDefault();
				e.stopPropagation();
			}
			switch (e.key) {
				case 'Tab':
					this.addChild();
					break;
				case 'Backspace':
					this.deleteSelection();
					break;
				case 'Enter':
					this.addSibling();
					break;
				default:
					break;
			}
		});
	}

	addChild() {
		for (let topicId of this.mindmap.selection.selection) {
			this.mindmap.eventBus.dispatch({
				topicId,
				type: 'addChild',
			});
		}
	}

	deleteSelection() {
		for (let topicId of this.mindmap.selection.selection) {
			this.mindmap.eventBus.dispatch({
				topicId,
				type: 'delete',
			});
		}
	}

	addSibling() {
		for (let topicId of this.mindmap.selection.selection) {
			this.mindmap.eventBus.dispatch({
				topicId,
				type: 'addSibling',
			});
		}
	}
}

export default Commands;
