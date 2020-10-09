# mindmap

This project is still under development

## Demo

![Alt Text](https://github.com/MichaelDuo/mindmap/blob/master/demo.png)

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

## Usage

```javascript
App.fromJSON(mindmapData);
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
