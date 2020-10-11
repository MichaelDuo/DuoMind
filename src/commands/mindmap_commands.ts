import CommandService from './command_service';
import MindMap from 'mindmap';

function mindmapCommands(mindmap: MindMap) {
	return new CommandService({
		['addChild']() {
			for (const topicId of mindmap.selection.selection) {
				mindmap.eventBus.dispatch({
					topicId,
					type: 'addChild',
				});
			}
		},
		['deleteSelection']() {
			for (const topicId of mindmap.selection.selection) {
				mindmap.eventBus.dispatch({
					topicId,
					type: 'delete',
				});
			}
		},
		['addSibling']() {
			for (const topicId of mindmap.selection.selection) {
				mindmap.eventBus.dispatch({
					topicId,
					type: 'addSibling',
				});
			}
		},
		['editTopic']({topicId}) {
			mindmap.selection.makeSelection([topicId]);
			mindmap.eventBus.dispatch({
				topicId,
				type: 'edit',
			});
		},
	});
}

export default mindmapCommands;
