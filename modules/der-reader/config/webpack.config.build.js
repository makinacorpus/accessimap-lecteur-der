var webpack = require('webpack');

module.exports = {
  entry: [
    './src/der-reader.js'
  ],
  output: {
    path: __dirname + '/../',
    filename: 'der-reader.js',
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
}
