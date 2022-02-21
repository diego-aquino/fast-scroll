import filesystem from 'fs-extra';

import { MANIFEST_JSON_PATH, PACKAGE_JSON_PATH } from '../config';
import { prettifyFiles } from '../utils/format';

type UpgradeMode = 'patch' | 'minor' | 'major';
const UPGRADE_MODES = new Set(['patch', 'minor', 'major']);

main();

async function main(): Promise<void> {
  const { upgradeMode } = processCLIArguments();
  await upgradeVersionAcrossFiles(upgradeMode);
}

function processCLIArguments(): { upgradeMode: UpgradeMode } {
  const [upgradeMode] = process.argv.slice(2);

  if (!upgradeMode) {
    console.error('[error] No upgrade mode provided. Abort.');
    process.exit(1);
  }

  function isValidUpgradeMode(modeCandidate: string): modeCandidate is UpgradeMode {
    return UPGRADE_MODES.has(modeCandidate);
  }

  if (!isValidUpgradeMode(upgradeMode)) {
    console.error(`[error] Upgrade mode '${upgradeMode}' not recognized. Abort.`);
    process.exit(1);
  }

  return { upgradeMode };
}

async function upgradeVersionAcrossFiles(upgradeMode: UpgradeMode): Promise<void> {
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

function getUpgradedVersion(currentVersion: string, upgradeMode: UpgradeMode): string {
  const parsedVersion = parseVersionComponents(currentVersion);
  const parsedUpgradedVersion = upgradeVersionComponents(parsedVersion, upgradeMode);
  const newVersion = formatVersionComponents(parsedUpgradedVersion);
  return newVersion;
}

interface ParsedVersion {
  patch: number;
  minor: number;
  major: number;
}

function parseVersionComponents(version: string): ParsedVersion {
  const [majorVersion, minorVersion, patchVersion] = version.split('.');
  const parsedVersion = {
    major: Number(majorVersion),
    minor: Number(minorVersion),
    patch: Number(patchVersion),
  };
  return parsedVersion;
}

function upgradeVersionComponents(parsedVersion: ParsedVersion, upgradeMode: UpgradeMode): ParsedVersion {
  switch (upgradeMode) {
    case 'patch':
      return {
        major: parsedVersion.major,
        minor: parsedVersion.minor,
        patch: parsedVersion.patch + 1,
      };
    case 'minor':
      return {
        major: parsedVersion.major,
        minor: parsedVersion.minor + 1,
        patch: 0,
      };
    case 'major':
      return {
        major: parsedVersion.major + 1,
        minor: 0,
        patch: 0,
      };
    default:
      throw new Error(`Unknown upgrade mode: ${upgradeMode}`);
  }
}

function formatVersionComponents(parsedVersion: ParsedVersion): string {
  return `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}`;
}
