import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';
import MindMap from 'mindmap';

class MindmapModel {
	public doc: Y.Doc = new Y.Doc();
	public root: Y.Map<any>;
	public mindmap?: MindMap;

	constructor(id: string) {
		this.root = this.doc.getMap('mindmap');
		const children = new Y.Array();

		this.root.set('title', 'Root Topic');
		this.root.set('children', children);

		this.doc.on('update', () => {
			console.log('Model Update');
		});

		this.root.observeDeep(() => {
			console.log('data updated');
		});
	}

	public setMindmap(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.mindmap.eventBus.on('MODEL_UPDATE', (e) =>
			this.handleMindmapUpdate(e)
		);
	}

	public getMindmapData() {
		return this.root.toJSON();
	}

	private handleMindmapUpdate(e: any) {
		switch (e.type) {
			case 'INSERT_CHILD':
				this.insertChild(e.payload);
				break;
			case 'SET_TITLE':
				this.setTitle(e.payload);
				break;
			case 'REMOVE_CHILD':
				this.removeChild(e.payload);
				break;
			default:
				break;
		}
	}

	private insertChild({path, index, topic}: any) {
		const topicModel = this.getModelByPath(path);
		const childModel = this.createModel(topic);
		topicModel.get('children').insert(index, [childModel]);
	}

	private setTitle({path, title}: any) {
		const topicModel = this.getModelByPath(path);
		topicModel.set('title', title);
		return;
	}

	private removeChild({path, index}: any) {
		const topicModel = this.getModelByPath(path);
		topicModel.get('children').delete(index);
		return;
	}

	private createModel(topic: any) {
		const topicModel = new Y.Map();
		for (const attr in topic) {
			switch (typeof topic[attr]) {
				case 'string':
					topicModel.set(attr, topic[attr]);
					break;
				case 'object':
					if (Array.isArray(topic[attr])) {
						const arr = new Y.Array();
						if (topic[attr].length > 0) {
							for (const child of topic[attr]) {
								arr.push([this.createModel(child)]);
							}
						}
						topicModel.set(attr, arr);
					}
					break;
				default:
					break;
			}
		}

		return topicModel;
	}

	private getModelByPath(path: number[]): any {
		let topic = this.root;
		for (const idx of path) {
			topic = topic.get('children').get(idx);
		}
		console.log(topic);
		return topic;
	}
}

export default MindmapModel;
