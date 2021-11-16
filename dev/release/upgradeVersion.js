const filesystem = require('fs-extra');

const { MANIFEST_JSON_PATH, PACKAGE_JSON_PATH } = require('../config');
const { prettifyFiles } = require('../utils/format');

main();

async function main() {
  const { newVersion } = processCLIArguments();
  await upgradeProjectVersion(newVersion);
  await prettifyFiles([MANIFEST_JSON_PATH, PACKAGE_JSON_PATH]);
}

function processCLIArguments() {
  const [newVersion] = process.argv.slice(3);

  if (!newVersion) {
    console.error('[error] New version not provided!');
    process.exit(1);
  }

  return { newVersion };
}

async function upgradeProjectVersion(newVersion) {
  const [manifestJSON, packageJSON] = await Promise.all([
    filesystem.readJSON(MANIFEST_JSON_PATH),
    filesystem.readJSON(PACKAGE_JSON_PATH),
  ]);

  manifestJSON.version = newVersion;
  packageJSON.version = newVersion;

  await Promise.all([
    filesystem.writeJSON(MANIFEST_JSON_PATH, manifestJSON),
    filesystem.writeJSON(PACKAGE_JSON_PATH, packageJSON),
  ]);
}
