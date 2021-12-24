const filesystem = require('fs-extra');

const { MANIFEST_JSON_PATH, PACKAGE_JSON_PATH } = require('../config');
const { prettifyFiles } = require('../utils/format');

const UPGRADE_MODES = new Set(['patch', 'minor', 'major']);

main();

async function main() {
  const { upgradeMode } = processCLIArguments();
  await upgradeVersionAcrossFiles(upgradeMode);
}

function processCLIArguments() {
  const [upgradeMode] = process.argv.slice(3);

  if (!upgradeMode) {
    console.error('[error] No upgrade mode provided. Abort.');
    process.exit(1);
  }

  if (!UPGRADE_MODES.has(upgradeMode)) {
    console.error(
      `[error] Upgrade mode '${upgradeMode}' not recognized. Abort.`,
    );
    process.exit(1);
  }

  return { upgradeMode };
}

async function upgradeVersionAcrossFiles(upgradeMode) {
  const [manifestJSON, packageJSON] = await Promise.all([
    filesystem.readJSON(MANIFEST_JSON_PATH),
    filesystem.readJSON(PACKAGE_JSON_PATH),
  ]);

  const upgradedVersion = getUpgradedVersion(packageJSON.version, upgradeMode);
  packageJSON.version = upgradedVersion;
  manifestJSON.version = upgradedVersion;

  await Promise.all([
    filesystem.writeJSON(MANIFEST_JSON_PATH, manifestJSON),
    filesystem.writeJSON(PACKAGE_JSON_PATH, packageJSON),
  ]);

  await prettifyFiles([MANIFEST_JSON_PATH, PACKAGE_JSON_PATH]);
}

function getUpgradedVersion(currentVersion, upgradeMode) {
  const parsedVersion = parseVersionComponents(currentVersion);
  const parsedUpgradedVersion = upgradeVersionComponents(
    parsedVersion,
    upgradeMode,
  );
  const newVersion = formatVersionComponents(parsedUpgradedVersion);
  return newVersion;
}

function parseVersionComponents(version) {
  const [majorVersion, minorVersion, patchVersion] = version.split('.');
  const parsedVersion = {
    major: majorVersion,
    minor: minorVersion,
    patch: patchVersion,
  };
  return parsedVersion;
}

function upgradeVersionComponents(parsedVersion, upgradeMode) {
  switch (upgradeMode) {
    case 'patch':
      return {
        major: parsedVersion.major,
        minor: parsedVersion.minor,
        patch: Number(parsedVersion.patch) + 1,
      };
    case 'minor':
      return {
        major: parsedVersion.major,
        minor: Number(parsedVersion.minor) + 1,
        patch: 0,
      };
    case 'major':
      return {
        major: Number(parsedVersion.major) + 1,
        minor: 0,
        patch: 0,
      };
    default:
      throw new Error(`Unknown upgrade mode: ${upgradeMode}`);
  }
}

function formatVersionComponents(parsedVersion) {
  return `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}`;
}
