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

let data1 = {
	title: '0',
	children: [
		// {
		// 	title: '0.1',
		// 	children: [
		// 		{
		// 			title: '0.1.1',
		// 		},
		// 		{
		// 			title: '0.1.2',
		// 		},
		// 	],
		// },
		{
			title: '0.2',
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
			children: [],
		},
		{
			title: '0.1',
		},
		// {title: '0.2'},
		// {title: '0.333343243'},
		// {title: '0.4'},
		// {title: '0.5'},
		// {title: '0.6'},
	],
};

App.fromJSON(data);
