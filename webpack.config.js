const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressWebpackPlugin = require('progress-webpack-plugin');

const { version } = require('./package.json');

const ENTRY_POINTS_DIR = path.resolve(__dirname, 'src', 'entries');

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const OUTPUT_DIR = path.resolve(__dirname, 'build', `fast-scroll-v${version}`).replace(/\./g, '-');

const FOCUS_VISIBLE_POLYFILL_PATH = path.resolve(
  __dirname,
  'node_modules',
  'focus-visible',
  'dist',
  'focus-visible.min.js',
);

const MODE = process.env.NODE_ENV ?? 'development';
const ENABLE_BUNDLE_ANALYZER = process.env.ANALYZE_BUNDLE === 'true';

module.exports = {
  mode: MODE,
  devtool: false,
  entry: {
    popup: path.resolve(ENTRY_POINTS_DIR, 'popup', 'popup.tsx'),
    content: path.resolve(ENTRY_POINTS_DIR, 'content', 'content.ts'),
    background: path.resolve(ENTRY_POINTS_DIR, 'background', 'background.ts'),
  },
  output: {
    path: OUTPUT_DIR,
    chunkFilename: '[id].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json'],
  },
  devServer: {
    hot: false,
    liveReload: false,
    webSocketServer: false,
    watchFiles: ['src/**/*.ts', 'public/**/*'],
    devMiddleware: { writeToDisk: true },
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
        { from: PUBLIC_DIR, to: OUTPUT_DIR, globOptions: { ignore: ['**/popup.html'] } },
        { from: FOCUS_VISIBLE_POLYFILL_PATH, to: OUTPUT_DIR },
      ],
    }),
    new ProgressWebpackPlugin(),
    ENABLE_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
  ].filter((plugin) => !!plugin),

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
