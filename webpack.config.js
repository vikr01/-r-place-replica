var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
	context: __dirname,
	
	entry: './DropboxPrototype/static/js/index',
	
	output: {
		path: path.resolve('./DropboxPrototype/static/bundles'),
		filename: "index.js",
	},
	
	plugins: [
		new BundleTracker({filename: './DropboxPrototype/webpack-stats.json'}),
	],
	
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
	
	resolve: {
		modules: ['node_modules', 'bower_components'],
		extensions: ['.js', '.jsx']
	},
};
