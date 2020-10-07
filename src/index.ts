import './styles/index.css';
import App from './app';

let data = {
	title: 'Mindmap Layout Test',
	children: [
		{
			title: '0.0',
			children: [
				{
					title: '0.0.0 layout children',
				},
				{
					title: '0.0.1',
				},
				{
					title: '0.0.2',
					children: [
						{
							title:
								'0.0.2.0 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
						},
						{
							title: '0.0.2.1',
							children: [
								{
									title: '0.0.2.1.0',
								},
								{
									title: '0.0.2.1.1',
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
					title:
						'0.1.0 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.',
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
			title: '0.2',
			children: [
				{
					title: '0.2.0',
				},
				{
					title: '0.2.1',
					children: [
						{
							title: '0.2.1.0',
						},
						{
							title: '0.2.1.1',
						},
					],
				},
			],
		},
		{
			title: '0.3',
			children: [
				{
					title: '0.3.0',
				},
				{
					title: '0.3.1',
					children: [
						{
							title:
								'0.3.1.0 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
						},
						{
							title: '0.3.1.1',
						},
					],
				},
			],
		},
	],
};

let data1 = {
	title: 'Mindmap Layout Demo feiwjafioe jfioejw iofj ieow',
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
		{
			title: '0.2',
		},
		// {
		// 	title: '0.2',
		// 	children: [
		// 		{
		// 			title: '0.1.1f fjdlasjfidhsa fdhasiofhdiosajf fdjsaiojfido',
		// 		},
		// 		{
		// 			title: '0.1.2',
		// 		},
		// 	],
		// },
		// {
		// 	title: '0.2',
		// 	children: [],
		// },
		// {
		// 	title: '0.1',
		// },
		// {title: '0.2'},
		// {title: '0.333343243'},
		// {title: '0.4'},
		// {title: '0.5'},
		// {title: '0.6'},
	],
};

App.fromJSON(data);
