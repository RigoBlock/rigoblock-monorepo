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
      }
    ]
  }
}
