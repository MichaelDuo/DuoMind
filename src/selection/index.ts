import Mindmap from 'mindmap';
import Topic from 'topic';
export default class Selections {
	mindmap: Mindmap;
	selection: Set<string>;

	constructor(mindmap: Mindmap) {
		this.mindmap = mindmap;
		this.selection = new Set();
		this.initEvents();
	}

	initEvents() {
		this.mindmap.eventBus.on('click:topic', ({topicId}) => {
			this.makeSelection([topicId]);
		});

		this.mindmap.eventBus.on('click:mindmap', ({}) => {
			this.clearSelection();
		});

		this.mindmap.eventBus.on('new:topic', (topic: Topic) => {
			this.makeSelection([topic.id]);
		});
	}

	clearSelection() {
		for (let topicId of this.selection) {
			this.mindmap.eventBus.dispatch({topicId, type: 'deselect'});
		}
		this.selection = new Set();
	}

	clearSelectionExcept(topicIds: Set<string>) {
		const selection = new Set(this.selection);
		for (let topicId of selection) {
			if (!topicIds.has(topicId)) {
				this.mindmap.eventBus.dispatch({topicId, type: 'deselect'});
				selection.delete(topicId);
			}
		}
		this.selection = selection;
	}

	makeSelection(topicIds: string[]) {
		this.clearSelectionExcept(new Set(topicIds));
		const selection = new Set(this.selection);
		for (let topicId of new Set(topicIds)) {
			if (!selection.has(topicId)) {
				this.mindmap.eventBus.dispatch({topicId, type: 'select'});
				selection.add(topicId);
			}
		}
		this.selection = selection;
	}
}
