const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const PostcssImport = require('postcss-import');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'rps.js',
		publicPath: ""
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader", "sass-loader"]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							context: "./src/images",
							outputPath: "images/"
						}
					}
				]
			}
		]
	},
	devServer: {
		hot: true
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				context: "./src",
				from: 'index.html',
				to: './'
			},
			{
				context: "./src/images",
				from: '*',
				to: './images'
			}/*,
			{
				context: './src/images',
				from: '*',
				to: './images'
			}*/
		]),
		new ExtractTextPlugin({
			filename: "rps.css",
			disable: false,
			allChunks: true
		})
	]
};