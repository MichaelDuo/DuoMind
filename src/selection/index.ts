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
		this.mindmap.eventBus.on('click:topic', ({topicId}) => {
			this.makeSelection([topicId]);
		});

		this.mindmap.eventBus.on('click:mindmap', ({topicId}) => {
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
