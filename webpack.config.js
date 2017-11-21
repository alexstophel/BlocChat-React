const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /.jsx$/, loader: 'babel-loader', exclude: '/node_modules' },
      { test: /.js$/, loader: 'babel-loader', exclude: '/node_modules' }
    ]
  }
}
