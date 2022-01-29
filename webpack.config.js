'use strict';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const __dirname = path.resolve();

export default {
  mode: 'production',
  entry: path.resolve(__dirname, 'static', 'js', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static', 'js'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};