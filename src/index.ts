import './styles/index.css';
import App from './app';

let data = {
	title: '0',
	children: [
		{
			title: '0.0',
			children: [
				{
					title: '0.0',
				},
				{
					title: '0.1',
				},
				{
					title: '0.0',
					children: [
						{
							title: '0.0',
						},
						{
							title: '0.1',
						},
					],
				},
				{
					title: '0.1',
				},
			],
		},
		{
			title: '0.1',
		},
	],
};

App.fromJSON(data);
