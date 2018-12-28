const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const combineLoaders = require('webpack-combine-loaders');
// const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

// const locals = {
//   routes: [
//     '/',
//   ],
// };

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
  },
};
