var webpack = require('webpack'),
  path = require('path');

module.exports = {
  mode: "development",
  entry: './Scripts/src/app.tsx',
  output: {
    path: path.resolve(__dirname,'Scripts/dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader'
      }
    ]
  },
  stats: "verbose"

}