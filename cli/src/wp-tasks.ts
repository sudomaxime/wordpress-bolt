import spawn from 'cross-spawn';
import chalk from 'chalk';
import path from 'path';

interface WordpressConfigs {
  siteSlug: string
  adminUserName: string
  adminPassword: string
  adminEmail: string
}

export async function makeWordpressConfigs (configs: WordpressConfigs): Promise<Error | void> {
  const DIRPATH = path.resolve(process.cwd(), '../../')

  console.log(`Installing Wordpress and creating the admin account ...`)

  spawn.sync('wp', [
    'core', 
    'install', 
    `--url=http://localhost/${configs.siteSlug}`,
    `--title=${configs.siteSlug}`,
    `--admin_user=${configs.adminUserName}`,
    `--admin_password=${configs.adminPassword}`,
    `--admin_email=${configs.adminEmail}`
  ], { stdio: 'inherit', cwd: DIRPATH + "/" + configs.siteSlug })

  console.log(`Switching Wordpress installation language to fr_FR, omelette du fromage ...`)

  spawn.sync('wp', [
    'language', 
    'core',
    'install',
    'fr_FR'
  ], { stdio: 'inherit', cwd: DIRPATH + "/" + configs.siteSlug })

  spawn.sync('wp', [
    'site', 
    'switch-language', 
    `fr_FR`
  ], { stdio: 'inherit', cwd: DIRPATH + "/" + configs.siteSlug})

  console.log(`Activating the sudo theme ...`)

  spawn.sync('wp', [
    'theme', 
    'activate', 
    `bolt`
  ], { stdio: 'inherit', cwd: DIRPATH + "/" + configs.siteSlug})

  console.log("Installing ACF PRO")

  spawn.sync('wp', [
    'plugin',
    'install',
    '--activate',
    `http://connect.advancedcustomfields.com/index.php?p=pro&a=download&k=b3JkZXJfaWQ9NjQzNjN8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE1LTA5LTE2IDE1OjUzOjQz`
  ], { stdio: 'inherit', cwd: DIRPATH + "/" + configs.siteSlug})
  
  console.log(`Wordpress sucessfully installed in ${chalk.underline.blue(process.cwd() + "/" + configs.siteSlug)}`)
}