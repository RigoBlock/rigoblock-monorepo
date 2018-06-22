module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$|\.css/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2
            }
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: require.resolve('svg-react-loader'),
        query: {
          xmlnsTest: /^xmlns.*$/
        }
      }
    ]
  }
}
