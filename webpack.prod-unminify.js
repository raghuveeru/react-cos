var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.unminified.js',
    publicPath: '/static/'
  },  
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/, loaders: ['style', 'css']}]
  },
  externals: {    
    "jquery": "jQuery",
  },
};