const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'bundle'
  },
  externals: [
    {
      'node-fetch': 'node-fetch'
    }
  ]
}
