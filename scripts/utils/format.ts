import { $ } from 'zx';

export async function prettifyFiles(files: string[], additionalFlags: string[] = ['--loglevel=warn']): Promise<void> {
  await $`yarn prettier --write ${files} ${additionalFlags}`;
}
