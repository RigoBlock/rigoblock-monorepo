const path = require('path')
const Jarvis = require('webpack-jarvis')
const AbiExtractPlugin = require('./abiExtractPlugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/contracts/index.js'),
  output: {
    filename: 'contracts.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'contracts'
  },
  target: 'node',
  resolve: {
    extensions: ['.js']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        }
      }
    ]
  },
  plugins: [
    new AbiExtractPlugin(),
    new Jarvis({
      port: 8081,
      watchOnly: false
    })
  ]
}
