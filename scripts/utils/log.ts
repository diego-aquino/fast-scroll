import { chalk } from 'zx';

class Log {
  info(message: string) {
    console.log(`${chalk.blue('info')} ${message}`);
  }

  progress(message: string, currentStep: number, totalSteps: number) {
    console.log(`${chalk.dim(`[${currentStep}/${totalSteps}]`)} ${message}`);
  }

  success(message: string) {
    console.log(`${chalk.green('success')} ${message}`);
  }
}

const log = new Log();

export default log;
