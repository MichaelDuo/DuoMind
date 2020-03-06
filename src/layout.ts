import Topic from './topic';

class Layout {
	constructor() {}
	update(topic: Topic) {
		let offset = 0;
		let u = (t: Topic) => {
			t.el.style.top = offset + 'px';
			offset += 50;
			for (let child of t.children) {
				u(child);
			}
		};
		u(topic);
	}
}

export default Layout;
