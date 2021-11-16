const filesystem = require('fs-extra');

const { PACKAGE_JSON_PATH } = require('../config');

main();

async function main() {
  const version = await getCurrentVersion();
  console.log(version);
}

async function getCurrentVersion() {
  const packageJSON = await filesystem.readJSON(PACKAGE_JSON_PATH);
  return packageJSON.version;
}
