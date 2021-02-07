import 'normalize.css';
import './styles/index.css';
import MindMap from './mindmap';
import Model from 'model';
(window as any).MindMap = MindMap;

window.onload = function () {
	const model = new Model('my-id');
	const el = document.getElementById('app');
	if (!el) return;
	const mindmap = new MindMap({data: model.getMindmapData()});
	model.setMindmap(mindmap);
	mindmap.mount(el);
	(window as any).mindmap = mindmap;
};

// const doc = new Y.Doc();
// const wsProvider = new WebsocketProvider(
// 	'ws://localhost:1234',
// 	'mindmap10',
// 	doc
// );

// wsProvider.on('status', (event: any) => {
// 	console.log('WS: ', event.status); // logs "connected" or "disconnected"
// 	console.log(doc.toJSON());
// });

// doc.once('update', (update: any) => {
// 	console.log('DOC update');
// 	(doc as any).get('mindmap').observeDeep((yArrEvent: any) => {
// 		console.log('children changed');
// 		console.log(yArrEvent[0]);
// 	});
// });

// const mindmap = doc.getMap('mindmap');
// mindmap.observeDeep((event: any) => {
// 	console.log('mindmap was modified');
// });

// const children = new Y.Array();
// mindmap.set('children', children);

// const children = new Y.Array();
// mindmap.set('children', children);
// console.log('observing arr');

// setTimeout(() => {
// 	(doc as any)
// 		.get('mindmap')
// 		.get('children')
// 		.observe((yArrEvent: any) => {
// 			console.log('children changed');
// 			console.log(yArrEvent);
// 		});
// }, 2000);
// children.insert(0, [1]);
// children.insert(0, [1]);

// (window as any).doc = doc;
// (window as any).children = children;
