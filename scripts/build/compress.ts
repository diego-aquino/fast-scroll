import archiver from 'archiver';
import filesystem from 'fs-extra';
import path from 'path';

import { BUILD_DIR, COMPRESSED_BUILD_PATH } from '~scripts/constants';

async function main() {
  const archive = archiver('zip');

  const compressedOutput = filesystem.createWriteStream(COMPRESSED_BUILD_PATH);
  archive.pipe(compressedOutput);
  archive.directory(BUILD_DIR, false);

  compressedOutput.on('close', () => {
    const successMessage = `[compress] Saved ${path.basename(
      COMPRESSED_BUILD_PATH,
    )} to ${BUILD_DIR} (total ${archive.pointer()} bytes)`;
    console.log(successMessage);
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

  await archive.finalize();
}

main();
