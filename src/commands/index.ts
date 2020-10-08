import MindMap from 'mindmap';
class Commands {
	mindmap: MindMap;
	constructor(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.initEvents();
	}

	initEvents() {
		this.mindmap.eventBus.on('keydown:Tab', ({event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.addChild();
		});

		this.mindmap.eventBus.on('keydown:Backspace', ({event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.deleteSelection();
		});

		this.mindmap.eventBus.on('keydown:Enter', ({event}) => {
			event.preventDefault();
			event.stopPropagation();
			this.addSibling();
		});

		this.mindmap.eventBus.on('dblclick:topic', ({event, topicId}) => {
			event.preventDefault();
			event.stopPropagation();
			this.edit(topicId);
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

	edit(topicId: string) {
		this.mindmap.selection.makeSelection([topicId]);
		this.mindmap.eventBus.dispatch({
			topicId,
			type: 'edit',
		});
	}
}

export default Commands;
