module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'dist/index.js',
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
  }
}
