'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const env = require('../config/prod.env')
const WebpackSftpClient = require('sm-webpack-scp');
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new WebpackSftpClient({
        port: '22',
        host: '118.89.216.249',
        username: 'root',
        password: 'ZZX137623',
        path: './dist/',
        remotePath: '/root/blog/dist/',
        // Show details of uploading for files
        verbose: true
    })
  ]
})
module.exports = webpackConfig
