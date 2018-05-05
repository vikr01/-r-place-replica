const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: '../Place/static/jsx/index',

  output: {
    path: path.resolve('./Place/static/bundles'),
    filename: 'index.js'
  },

  plugins: [
    new BundleTracker({ filename: './webpack/webpack-stats.json' })
  ],

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ }
    ]
  },

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  },

  stats: "minimal"
};
