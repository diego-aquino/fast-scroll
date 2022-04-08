const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressWebpackPlugin = require('progress-webpack-plugin');

const { version } = require('./package.json');

const ENTRY_POINTS_DIR = path.resolve(__dirname, 'src', 'entries');

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const OUTPUT_DIR = path.resolve(__dirname, 'build', `fast-scroll-v${version}`).replace(/\./g, '-');

const BROWSER_POLYFILL_PATH = path.resolve(
  __dirname,
  'node_modules',
  'webextension-polyfill',
  'dist',
  'browser-polyfill.min.js',
);
const FOCUS_VISIBLE_POLYFILL_PATH = path.resolve(
  __dirname,
  'node_modules',
  'focus-visible',
  'dist',
  'focus-visible.min.js',
);

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  devtool: false,
  entry: {
    popup: path.resolve(ENTRY_POINTS_DIR, 'popup', 'popup.tsx'),
    content: path.resolve(ENTRY_POINTS_DIR, 'content', 'content.ts'),
  },
  output: {
    path: OUTPUT_DIR,
    chunkFilename: '[id].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack', 'cache'),
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'popup.html',
      template: path.resolve(__dirname, 'public', 'pages', 'popup.html'),
      inject: 'head',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PUBLIC_DIR,
          to: OUTPUT_DIR,
          globOptions: { ignore: ['**/popup.html'] },
        },
        { from: BROWSER_POLYFILL_PATH, to: OUTPUT_DIR },
        { from: FOCUS_VISIBLE_POLYFILL_PATH, to: OUTPUT_DIR },
      ],
    }),
    new ProgressWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: ['swc-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
