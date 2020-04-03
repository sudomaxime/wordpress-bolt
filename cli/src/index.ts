import { checkSystem } from './syscheck';
import path from 'path';
import { config } from 'dotenv';
import { createDatabase } from './mysql-tasks';
import { makeWordpressConfigs } from './wp-tasks';
import randomstring from 'randomstring';
import chalk from 'chalk';

// Grab wordpress .env environment
config({path: path.resolve(process.cwd(), '../.env')});

(async (): Promise<void> => {
  const randomPwd: string = randomstring.generate(10);
  const defaultAdmin: string = "Sudo";

  checkSystem();

  await createDatabase(process.env.DB_NAME!, {
    host: 'localhost',
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!
  });

  await makeWordpressConfigs({
    siteSlug: process.env.WP_ROOT_DIRECTORY!,
    adminUserName: "Sudo",
    adminEmail: "info@agencesudo.ca",
    adminPassword: randomPwd
  });

  console.log("\n+=========================================================+")
  console.log(chalk.green('\nLife is good, your wordpress is ready. \n'));
  console.log(chalk.blue(`Admin name is:     `), chalk.red.underline(defaultAdmin));
  console.log(chalk.blue(`Admin password is: `), chalk.red.underline(randomPwd), '\n');
  console.log(chalk.red(`Seek knowledge, break the rules.\n`));
  console.log("+=========================================================+\n")

  console.log(chalk.red.underline(`! - DON'T FORGET TO CREATE A FRESH GIT DO:`));
  console.log(chalk.white(`$ rm -rf .git`));
  console.log(chalk.white(`$ git init\n`));

  process.exit()
  return
})()