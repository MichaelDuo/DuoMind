import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';
import MindMap from 'mindmap';

class MindmapModel {
	public doc: Y.Doc = new Y.Doc();
	public data: Y.Map<any>;
	public mindmap?: MindMap;

	constructor(id: string) {
		this.data = this.doc.getMap('mindmap');
		const children = new Y.Array();

		this.data.set('title', 'Root Topic');
		this.data.set('children', children);

		this.doc.on('update', () => {
			console.log('Model Update');
		});

		this.data.observeDeep(() => {
			console.log('data updated');
		});
	}

	public setMindmap(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.mindmap.eventBus.on('MODEL_UPDATE', (e) => {
			console.log('mindmap Update', e);
		});
	}

	public getMindmapData() {
		return this.data.toJSON();
	}
}

export default MindmapModel;
