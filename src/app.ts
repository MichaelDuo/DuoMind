import MindMap from './mindmap';

class App {
	mindmap: MindMap;
	el: HTMLElement;
	private constructor(data: any) {
		this.el = document.createElement('div');
		this.mindmap = new MindMap({data});

		this.el.classList.add('app');
	}

	static fromJSON(data: any) {
		let app = new App(data);
		document.body.appendChild(app.el);
		app.mindmap.mount(app.el);
	}
}

export default App;
