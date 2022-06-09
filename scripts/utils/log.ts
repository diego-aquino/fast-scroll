import { chalk } from 'zx';

export class Log {
  private nextStep = 1;

  constructor(private totalSteps?: number) {}

  info(message: string) {
    console.log(`${chalk.blue('info')} ${message}`);
  }

  progress(message: string) {
    if (this.totalSteps === undefined) {
      console.log(`${chalk.dim('...')} ${message}`);
    } else {
      console.log(`${chalk.dim(`[${this.nextStep++}/${this.totalSteps}]`)} ${message}`);
    }
  }

  success(message: string) {
    console.log(`${chalk.green('success')} ${message}`);
  }
}

const log = new Log();

export default log;
