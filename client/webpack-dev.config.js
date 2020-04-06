const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const socketConfig = require('../config');
const addBaseConfig = require('./webpack-base.config');

const configs = addBaseConfig({
  mode: 'development',
  output: {
    filename: 'src/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'React VideoCall - Marouen Mhiri',
      filename: 'index.html',
      template: 'src/html/index.html'
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    proxy: {
      '/bridge/': `http://localhost:${socketConfig.PORT}`
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});

module.exports = configs;
