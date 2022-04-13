import { $ } from 'zx';

$.verbose = false;

export async function prettifyFiles(files: string[], additionalFlags: string[] = ['--loglevel=warn']): Promise<void> {
  await $`yarn prettier --write ${files} ${additionalFlags}`;
}
