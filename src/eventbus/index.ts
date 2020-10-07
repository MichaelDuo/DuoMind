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

	dispatch(action: {topicId: string; type: string; payload?: any}) {
		if (this.topics[action.topicId]) {
			this.topics[action.topicId].onAction(action);
		}
	}

	initEvents() {
		this.mindmap.dom.addEventListener('click', (event) => {
			let clickOnTopic = false;
			let target = event.target as HTMLElement | null;
			while (target && target != this.mindmap.dom) {
				if (target.classList.contains('topic')) {
					clickOnTopic = true;
					break;
				}
				target = target.parentNode as HTMLElement;
			}
			if (clickOnTopic) {
				this.emit('click:topic', {event, topicId: target!.id});
			} else {
				this.emit('click:mindmap', {event});
			}
		});

		document.addEventListener('keydown', (event) => {
			this.emit(`keydown:${event.key}`, {event});
		});
	}
}

export default EventBus;
