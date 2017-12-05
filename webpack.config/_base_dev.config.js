// Base Dev Configuration for Webpack

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader?importLoaders=1']},
        { test: /\.ts$/, use: 'ts-loader'}
    ]

  },
  plugins: []
}
