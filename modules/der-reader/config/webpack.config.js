var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/* import postcss config array */
var postCSSConfig = require('./postcss.config')

module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    '../src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '',
    filename: 'index.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    contentBase: './public',
    port: 8080,
    hot: true,
    hotOnly: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: '../src/index.ejs',
      filename: 'index.html'
    })
  ]
}
