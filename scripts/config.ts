import path from 'path';

import packageJSON from '~~/package.json';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const BUILD_DIR = path.resolve(ROOT_DIR, 'build', `fast-scroll-v${packageJSON.version}`).replace(/\./g, '-');
export const COMPRESSED_BUILD_PATH = `${BUILD_DIR}.zip`;

export const MANIFEST_JSON_PATH = path.resolve(ROOT_DIR, 'public', 'manifest.json');
export const PACKAGE_JSON_PATH = path.resolve(ROOT_DIR, 'package.json');
