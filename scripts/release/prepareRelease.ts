import { $ } from 'zx';

import { PRODUCTION_BRANCH, REPOSITORY_URL } from '~scripts/config';
import { pipedToStandardOutputs } from '~scripts/utils/commands';
import { Log } from '~scripts/utils/log';

import upgradeVersion from './upgradeVersion';

const TOTAL_PROGRESS_STEPS = 4;
const log = new Log(TOTAL_PROGRESS_STEPS);

prepareRelease();

async function prepareRelease() {
  log.progress('Upgrading version...');
  const releaseVersion = await upgradeVersion();
  log.success(`Version upgraded to '${releaseVersion}'.`);

  const releaseBranch = `release/v${releaseVersion}`;
  log.progress(`Creating branch '${releaseBranch}'...`);
  await pipedToStandardOutputs($`git checkout -b ${releaseBranch}`);

  log.progress('Committing version updates...');
  await pipedToStandardOutputs($`git add .`);
  const releaseCommitMessage = `release: upgrade version to v${releaseVersion}`;
  await pipedToStandardOutputs($`git commit -m ${releaseCommitMessage}`);

  log.progress(`Pushing '${releaseBranch}' to origin...`);
  await pipedToStandardOutputs($`git push --set-upstream origin ${releaseBranch}`);

  const pullRequestTitle = `release: v${releaseVersion}`;
  const pullRequestURL = `${REPOSITORY_URL}/compare/${PRODUCTION_BRANCH}...${encodeURIComponent(
    releaseBranch,
  )}?title=${encodeURIComponent(pullRequestTitle)}&expand=1`;

  log.success('Release prepared!');
  log.info(`Create the release pull request at: ${pullRequestURL}`);
}
