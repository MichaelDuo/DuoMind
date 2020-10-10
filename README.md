# DuoMind

MindMapping software

## Demo

Try: [https://michaelduo.github.io/DuoMind/](https://michaelduo.github.io/DuoMind/)

![](https://github.com/MichaelDuo/mindmap/blob/master/demo.png)

## Roadmap

-   [x] Topic rendering
-   [x] Left layout
-   [x] Right layout
-   [x] Map layout
-   [x] Event module
-   [x] Selection module
-   [x] Editable topic
-   [x] Command module
-   [ ] Drag and drop module
-   [ ] Undo redo module

## Usage

```javascript
new MindMap({data}).mount(el);
```

## mindmap data example

```javascript
let data1 = {
	title: '0',
	children: [
		{
			title: '0.1',
			children: [
				{
					title: '0.1.1',
				},
				{
					title: '0.1.2',
				},
			],
		},
	],
};
```

## install dependencies

`$ npm install`

## run dev

`$ npm run dev`
