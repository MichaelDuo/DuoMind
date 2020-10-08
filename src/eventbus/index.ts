import MindMap from 'mindmap';
import Topic from 'topic';
import {findTopicId} from 'utils';
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

	dispatch(action: {topicId: string; type: string; payload?: any}) {
		if (this.topics[action.topicId]) {
			this.topics[action.topicId].onAction(action);
		}
	}

	initEvents() {
		this.mindmap.dom.addEventListener('click', (event) => {
			const topicId = findTopicId(event.target as HTMLElement);
			if (topicId) {
				this.emit('click:topic', {event, topicId});
			} else {
				this.emit('click:mindmap', {event});
			}
		});

		document.addEventListener('keydown', (event) => {
			this.emit(`keydown:${event.key}`, {event});
		});

		this.mindmap.dom.addEventListener('dblclick', (event) => {
			const topicId = findTopicId(event.target as HTMLElement);
			if (topicId) {
				this.emit('dblclick:topic', {event, topicId});
			} else {
				this.emit('dblclick:mindmap', {event});
			}
		});
	}
}

export default EventBus;
