import { $ } from 'zx';

export async function prettifyFiles(files: string[], additionalFlags: string[] = ['--loglevel=warn']): Promise<void> {
  $.verbose = false;
  await $`yarn prettier --write ${files} ${additionalFlags}`;
}
