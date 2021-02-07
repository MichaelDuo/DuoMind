import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';
import MindMap from 'mindmap';
import Topic from 'topic';
import {v4 as uuid} from 'uuid';

class MindmapModel {
	public doc: Y.Doc = new Y.Doc();
	public root: Y.Map<any>;
	public mindmap?: MindMap;
	private syncing = false;

	constructor(id: string) {
		this.root = this.doc.getMap('mindmap');

		const children = new Y.Array();
		this.root.set('title', 'Root Topic');
		this.root.set('id', 'root');
		this.root.set('children', children);

		this.sync();
		this.root.observeDeep((events) => {
			// model update map and prevent map update model
			if (!this.syncing) {
				this.syncing = true;
				for (const e of events) {
					if (e instanceof Y.YMapEvent) {
						this.handleMapEvent(e);
					} else if (e instanceof Y.YArrayEvent) {
						this.handleArrayEvent(e);
					}
				}
				this.syncing = false;
			}
		});
	}

	public async sync() {
		const wsProvider = new WebsocketProvider(
			'ws://localhost:1234',
			'2',
			this.doc
		);

		// wsProvider.on('sync', (isSynced: any) => {
		// 	this.syncing = !isSynced;
		// 	console.log('======= REMOTE UPDATE ======', isSynced);
		// });
	}

	public setMindmap(mindmap: MindMap) {
		this.mindmap = mindmap;
		this.mindmap.eventBus.on('MODEL_UPDATE', (e) => {
			// map update model and prevent model update map
			if (!this.syncing) {
				this.syncing = true;
				this.handleMindmapUpdate(e);
				this.syncing = false;
			}
		});
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
		return topic;
	}

	private handleMapEvent(e: Y.YMapEvent<any>) {
		// console.log('Handle Map Event');
		// console.log(e);
		// console.log(e);
	}

	private handleArrayEvent(e: Y.YArrayEvent<any>) {
		// console.log('Handle Array Event');
		// console.log(e.changes.delta);
		const target = this.mindmap?.getTopicById(e.target.parent?.toJSON().id);
		for (const change of e.changes.delta) {
			for (const op in change) {
				switch (op) {
					case 'retain':
						break;
					case 'insert':
						for (const item of (change as any)[op]) {
							const topic = new Topic(item.toJSON(), {
								mindmap: this.mindmap!,
								parent: null,
							});
							target?.insertChild(target.children.length, topic);
						}
						break;
					default:
						break;
				}
			}
		}
	}
}

export default MindmapModel;
