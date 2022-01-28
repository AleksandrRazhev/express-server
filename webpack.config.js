'use strict';
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './static/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/static/js'),
  },
  watch: true,
  devtool: 'source-map',
  module: {}
};