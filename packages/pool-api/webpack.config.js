const path = require('path')
// const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    filename: 'src/index.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  node: {
    fs: 'empty',
    module: 'empty'
  }
}
