import { $ } from 'zx';

import { PRODUCTION_BRANCH, REPOSITORY_URL } from '~scripts/config';
import { pipedToStandardOutputs } from '~scripts/utils/commands';
import log from '~scripts/utils/log';

import upgradeVersion from './upgradeVersion';

const TOTAL_PROGRESS_STEPS = 4;

prepareRelease();

async function prepareRelease() {
  log.progress('Upgrading version...', 1, TOTAL_PROGRESS_STEPS);
  const releaseVersion = await upgradeVersion();
  log.success(`Version upgraded to '${releaseVersion}'.`);

  const releaseBranch = `release/v${releaseVersion}`;
  log.progress(`Creating branch '${releaseBranch}'...`, 2, TOTAL_PROGRESS_STEPS);
  await pipedToStandardOutputs($`git checkout -b ${releaseBranch}`);

  log.progress('Committing version updates...', 3, TOTAL_PROGRESS_STEPS);
  await pipedToStandardOutputs($`git add .`);
  const releaseCommitMessage = `release: upgrade version to v${releaseVersion}`;
  await pipedToStandardOutputs($`git commit -m ${releaseCommitMessage}`);

  log.progress(`Pushing '${releaseBranch}' to origin...`, 4, TOTAL_PROGRESS_STEPS);
  await pipedToStandardOutputs($`git push --set-upstream origin ${releaseBranch}`);

  const pullRequestTitle = `release: v${releaseVersion}`;
  const pullRequestURL = `${REPOSITORY_URL}/compare/${PRODUCTION_BRANCH}...${encodeURIComponent(
    releaseBranch,
  )}?title=${encodeURIComponent(pullRequestTitle)}&expand=1`;

  log.success('Release prepared!');
  log.info(`Create the release pull request at: ${pullRequestURL}`);
}
