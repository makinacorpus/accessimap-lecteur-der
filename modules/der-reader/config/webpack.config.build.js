var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/* import postcss config array */
var postCSSConfig = require('./postcss.config')

module.exports = {
  entry: {
    'der-reader': ['./src/der-reader.js'],
    'index': './src/index.js'
  },
  output: {
    path: __dirname + '/../dist/',
    filename: '[name].js',
    library: 'DerReader',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ],
      },
    ]
  },
  postcss: function() {
    return postCSSConfig;
  },
  externals: {
    version: JSON.stringify(require('./../package.json').version)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      version: JSON.stringify(require('../package.json').version)
    })
  ]
}
