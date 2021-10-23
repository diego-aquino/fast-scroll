const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { version } = require('./package.json');

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const OUTPUT_DIR = path
  .resolve(__dirname, 'build', `fast-scroll-v${version}`)
  .replace(/\./g, '-');

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  devtool: false,
  entry: {
    content: path.resolve(__dirname, 'src', 'content.ts'),
  },
  output: {
    path: OUTPUT_DIR,
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
      patterns: [{ from: PUBLIC_DIR, to: OUTPUT_DIR }],
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
