const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  devtool: false,
  entry: {
    content: path.resolve(__dirname, 'src', 'content.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[id].js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    hot: false,
    liveReload: false,
    webSocketServer: false,
    watchFiles: ['src/**/*.ts', 'public/**/*'],
    devMiddleware: {
      writeToDisk: true,
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'manifest.json'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
