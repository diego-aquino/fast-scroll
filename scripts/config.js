const path = require('path');

const { version } = require('../package.json');

const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path
  .resolve(ROOT_DIR, 'build', `fast-scroll-v${version}`)
  .replace(/\./g, '-');
const COMPRESSED_BUILD_PATH = `${BUILD_DIR}.zip`;

const MANIFEST_JSON_PATH = path.resolve(ROOT_DIR, 'public', 'manifest.json');
const PACKAGE_JSON_PATH = path.resolve(ROOT_DIR, 'package.json');

module.exports = {
  ROOT_DIR,
  BUILD_DIR,
  COMPRESSED_BUILD_PATH,
  MANIFEST_JSON_PATH,
  PACKAGE_JSON_PATH,
};
