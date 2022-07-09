import filesystem from 'fs-extra';

import { PACKAGE_JSON_PATH } from '~scripts/constants';

async function getCurrentVersion() {
  const packageJSON = await filesystem.readJSON(PACKAGE_JSON_PATH);
  return packageJSON.version;
}

async function getVersion() {
  const version = await getCurrentVersion();
  console.log(version);
}

getVersion();
