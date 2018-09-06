const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/app.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime']
          }
        }]
      }, {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: 'file-loader?name=css/img/[name].[ext]',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'],
      Waves: 'node-waves'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {
        from: 'client/assets/manifest.json',
        to: './manifest.json'
      }, {
        from: 'client/assets/uploads/logo.png',
        to: './logo.png'
      }, {
        from: 'client/assets/uploads',
        to: './uploads'
      },
    ])
  ]
};
