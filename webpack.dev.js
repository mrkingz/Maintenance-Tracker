const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  watch: true,
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/assets/index.html',
      filename: 'index.html',
      inject: 'body',
    })
  ]
});