const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    fb: path.resolve(__dirname, 'src', 'fb.ts'),
    background: path.resolve(__dirname, 'src', 'background.ts'),
    popup: path.resolve(__dirname, 'src', 'popup.tsx'),
    options: path.resolve(__dirname, 'src', 'options.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'extension', 'js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: [
          'node-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'src', 'config'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css',
      '.scss',
      '.less',
      '.node',
    ],
  },
  devtool: 'inline-cheap-module-source-map',
  target: 'web',
};
