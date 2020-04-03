import { sync as cmdExists } from 'command-exists';
import chalk from 'chalk';

/**
 * Checks the system if these bash commands can be called.
 * returns a boolean if all the cmds are available on that system.
 */
export function checkSystem (): boolean 
{
  console.log(chalk.blue("Weblove cli syscheck ..."))

  let errors: boolean = false

  if (!cmdExists('wp')) {
    console.log(chalk.red(`ERROR: You do not seem to have wp-cli installed`))
    console.log(chalk.white.dim(`You can check this link for more informations on how to install wp-cli`))
    console.log(chalk.blue.underline(`https://wp-cli.org/fr/`)) 
    console.log(chalk.white.dim(`Good luck ! \n`))
    errors = true
  } else {
    console.log(chalk.green("✔ wp-cli correctly installed"))
  }

  if (!cmdExists('composer')) {
    console.log(chalk.red(`You do not seem to have composer installed`))
    console.log(chalk.white.dim(`You can check this link for more informations on how to install composer`))
    console.log(chalk.blue.underline(`https://getcomposer.org/download/`)) 
    console.log(chalk.white.dim(`Good luck ! \n`))
    errors = true
  } else {
    console.log(chalk.green("✔ composer correctly installed"))
  }

  if (!cmdExists('mysql')) {
    console.log(chalk.red(`You do not seem to have mysql installed`))
    console.log(chalk.white.dim(`You can check this link for more informations on how to install composer`))
    console.log(chalk.blue.underline(`https://getcomposer.org/download/`)) 
    console.log(chalk.white.dim(`Good luck ! \n`))
    errors = true
  } else {
    console.log(chalk.green("✔ mysql correctly installed"))
  }

  return errors;
}