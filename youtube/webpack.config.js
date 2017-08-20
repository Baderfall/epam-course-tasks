module.exports = {
  entry: './built/main',

  output: {
    path: __dirname + '/scripts',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel'}
    ]
  },

  watch: true,

  devtool: 'sourcemap'
};
