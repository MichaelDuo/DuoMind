import Mindmap from 'mindmap';
export default class Selections {
	mindmap: Mindmap;
	constructor(mindmap: Mindmap) {
		this.mindmap = mindmap;
		this.initEvents();
	}

	initEvents() {
		this.mindmap.dom.addEventListener('click', () => {
			console.log('Click on mindmap');
		});
	}
}
