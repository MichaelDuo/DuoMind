import MindMap from 'mindmap';
import Topic from 'topic';
class EventBus {
	mindmap: MindMap;
	topics: {[key: string]: Topic} = {};
	listeners: {[key: string]: ((data: any) => any)[]} = {};

	constructor(mindmap: MindMap) {
		this.mindmap = mindmap;
	}

	on(event: string, cb: (data: any) => any) {
		if (this.listeners[event]) {
			this.listeners[event].push(cb);
		} else {
			this.listeners[event] = [cb];
		}
	}

	off(event: string, cb: any) {
		const i = this.listeners[event].indexOf(cb);
		if (i >= 0) this.listeners[event].splice(i, 1);
	}

	emit(event: string, data?: any) {
		const events = this.listeners[event];
		if (events) {
			events.forEach((listener) => {
				listener(data);
			});
		}
	}

	register(topic: Topic) {
		this.topics[topic.id] = topic;
	}

	unregister(topic: Topic) {
		delete this.topics[topic.id];
	}

	dispatch(action: {id: string; payload: any}) {
		if (this.topics[action.id]) {
			this.topics[action.id].onAction(action);
		}
	}
}

export default EventBus;
