import './styles/index.css';
import App from './app';

let data = {
	title: '0',
	children: [
		{
			title: '0.0',
			children: [
				{
					title: '0.0.0',
				},
				{
					title: '0.0.1',
				},
				{
					title: '0.0.2',
					children: [
						{
							title: '0.0.2.0',
						},
						{
							title: '0.0.2.1',
							children: [
								{
									title: '0.1.1.0',
								},
								{
									title: '0.1.1.1',
								},
							],
						},
					],
				},
				{
					title: '0.0.3',
				},
			],
		},
		{
			title: '0.1',
			children: [
				{
					title: '0.1.0',
				},
				{
					title: '0.1.1',
					children: [
						{
							title: '0.1.1.0',
						},
						{
							title: '0.1.1.1',
						},
					],
				},
			],
		},
		{
			title: '0.1',
			children: [
				{
					title: '0.1.0',
				},
				{
					title: '0.1.1',
					children: [
						{
							title: '0.1.1.0',
						},
						{
							title: '0.1.1.1',
						},
					],
				},
			],
		},
		{
			title: '0.1',
			children: [
				{
					title: '0.1.0',
				},
				{
					title: '0.1.1',
					children: [
						{
							title: '0.1.1.0',
						},
						{
							title: '0.1.1.1',
						},
					],
				},
			],
		},
	],
};

// let data = {
// 	title: '0',
// 	children: [
// 		{
// 			title: '0.0',
// 			children: [{title: '0.0.0'}, {title: '0.0.1'}],
// 		},
// 		{
// 			title: '0.1',
// 		},
// 	],
// };

App.fromJSON(data);
