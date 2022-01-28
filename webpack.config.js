'use strict';
import path from 'path';
const __dirname = path.resolve();

export default {
  mode: 'production',
  entry: path.resolve(__dirname, 'static', 'js', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static', 'js'),
  },
  watch: true,
  devtool: 'source-map',
  module: {}
};