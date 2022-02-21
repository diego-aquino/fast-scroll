import archiver from 'archiver';
import filesystem from 'fs-extra';
import path from 'path';

import { BUILD_DIR, COMPRESSED_BUILD_PATH } from '~scripts/config';

const compressedOutput = filesystem.createWriteStream(COMPRESSED_BUILD_PATH);
const archive = archiver('zip');
archive.pipe(compressedOutput);
archive.directory(BUILD_DIR, false);

compressedOutput.on('close', () => {
  console.log(
    `[compress] Saved ${path.basename(COMPRESSED_BUILD_PATH)} to ${BUILD_DIR} (total ${archive.pointer()} bytes)`,
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
