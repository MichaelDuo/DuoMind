import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';
import MindMap from 'mindmap';
import Topic from 'topic';
import {v4 as uuid} from 'uuid';
import {isEmpty} from 'lodash';

class MindmapModel {
	public doc: Y.Doc = new Y.Doc();
	public mindmap?: MindMap;
	public root!: Y.Map<any>;

	private syncing = false;
	private id: string;
	private provider!: WebsocketProvider;

	constructor(id: string) {
		this.id = id;
	}

	public async sync(cb: (err: Error | null, status: string | null) => void) {
		// 'ws://localhost:1234'
		this.provider = new WebsocketProvider(
			'wss://duomind.org/',
			this.id,
			this.doc
		);

		this.provider.on('synced', (...args: any[]) => {
			this.root = this.doc.getMap('mindmap');
			if (isEmpty(this.root.toJSON())) {
				const children = new Y.Array();
				this.root.set('title', 'Root Topic');
				this.root.set('id', 'root');
				this.root.set('children', children);
			}
		});

		this.doc.once('update', () => {
			this.root = this.doc.getMap('mindmap');
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

			cb(null, 'good');
		});

		(window as any).provider = this.provider;
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
		const target = this.mindmap?.getTopicById(e.target.toJSON().id);
		target?.updateTitle((e.target as any).get('title'));
	}

	private handleArrayEvent(e: Y.YArrayEvent<any>) {
		// console.log('Handle Array Event');
		if (!this.mindmap) {
			throw new Error('Mindmap is not found');
		}
		const target = this.mindmap?.getTopicById(e.target.parent?.toJSON().id);

		if (!target) {
			throw new Error('Target is not found');
		}

		let cursor = 0;
		for (const change of e.changes.delta) {
			for (const op in change) {
				switch (op) {
					case 'retain':
						cursor += (change as any)[op];
						break;
					case 'insert':
						for (const item of (change as any)[op]) {
							const topic = Topic.fromJSON(item.toJSON(), {
								mindmap: this.mindmap,
								parent: target,
							});
							target?.insertChild(cursor, topic);
						}
						break;
					case 'delete':
						for (let i = 0; i < (change as any)[op]; i++) {
							const child = target?.children[cursor];
							target?.removeChild(target.children[cursor]);
							child?.destroy();
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
