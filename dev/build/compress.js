const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const { version } = require('../../package.json');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const OUTPUT_DIR = path.resolve(ROOT_DIR, 'build');
const BUILD_DIR = path
  .resolve(OUTPUT_DIR, `fast-scroll-v${version}`)
  .replace(/\./g, '-');
const OUTPUT_PATH = `${BUILD_DIR}.zip`;

const compressedOutput = fs.createWriteStream(OUTPUT_PATH);
const archive = archiver('zip');
archive.pipe(compressedOutput);
archive.directory(BUILD_DIR, false);

compressedOutput.on('close', () => {
  console.log(
    `compress: saved ${path.basename(
      OUTPUT_PATH,
    )} to the build directory (total ${archive.pointer()} bytes)`,
  );
});

archive.on('warning', (error) => {
  if (error.code === 'ENOENT') {
    console.error(error.message);
  } else {
    throw error;
  }
});

archive.on('error', (error) => {
  throw error;
});

archive.finalize();
