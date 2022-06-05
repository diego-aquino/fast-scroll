import filesystem from 'fs-extra';

import { PACKAGE_JSON_PATH } from '~scripts/config';

getVersion();

async function getVersion() {
  const version = await getCurrentVersion();
  console.log(version);
}

async function getCurrentVersion() {
  const packageJSON = await filesystem.readJSON(PACKAGE_JSON_PATH);
  return packageJSON.version;
}
