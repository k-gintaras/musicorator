const path = require('path');

module.exports = {
  entry: './src/index.js', // replace with your main file
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
};
