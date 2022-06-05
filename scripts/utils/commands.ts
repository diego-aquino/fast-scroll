import { ProcessPromise, ProcessOutput } from 'zx';

export function pipedToStandardOutputs(processPromise: ProcessPromise<ProcessOutput>): ProcessPromise<ProcessOutput> {
  processPromise.stdout.pipe(process.stdout);
  processPromise.stderr.pipe(process.stderr);
  return processPromise;
}
