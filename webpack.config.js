var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
	context: __dirname,
	
	entry: './djangoproject/djangoapp/static/js/index',
	
	output: {
		path: path.resolve('./djangoproject/djangoapp/static/bundles/'),
		filename: "[name]-[hash].js",
	},
	
	plugins: [
		new BundleTracker({filename: './djangoproject/webpack-stats.json'}),
	],
	
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
	
	resolve: {
		modules: ['node_modules', 'bower_components'],
		extensions: ['.js', '.jsx']
	},
	
	
};
