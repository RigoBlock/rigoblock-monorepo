module.exports = {
  module: {
    rules: [
      {
        test: /\.(d.ts|js.map)$/,
        use: 'null-loader'
      },
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
        loader: require.resolve('svg-react-loader'),
        query: {
          xmlnsTest: /^xmlns.*$/
        }
      }
    ]
  }
}
