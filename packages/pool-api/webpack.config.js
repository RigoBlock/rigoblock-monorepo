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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // new webpack.ContextReplacementPlugin(
    //   /artifacts/,
    //   path.resolve(__dirname, '..', 'artifacts'),
    //   true,
    //   /^.*.json$/
    // )
  ],
  node: {
    fs: 'empty',
    module: 'empty',
    '@0xproject/deployer': 'empty'
  }
}
