const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	resolve: {
		modules: ['node_modules', path.resolve('./src')],
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/assets/index.html',
		}),
	],
	devServer: {
		host: '0.0.0.0',
		port: 8085,
	},
};
