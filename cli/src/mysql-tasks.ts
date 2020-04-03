import mysql from 'mysql';
import chalk from 'chalk';

interface MysqlConfigs {
  host: string
  user: string
  password: string
}

/**
 * Creates an empty MYSQL database with the provided informations.
 * 
 * @param databaseName - Name of the database you want to create, ideally with underscores
 * @param configs - A hash containing the mysql connection information
 */
export function createDatabase (databaseName: string, configs: MysqlConfigs): Promise<Error | void> 
{
  var connection = mysql.createConnection({
    host: configs.host,
    user: configs.user,
    password: configs.password,
  })

  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) throw err;
      console.log(chalk.green('Connected to MYSQL database'));
      connection.query(`CREATE DATABASE ${databaseName}`, function (err, result) {
        if (err) {
          console.log(err)
          console.log(chalk.red('We could not create the database for this project, check if the database already exists or if the name is valid.'))
          process.exit(0)
          return reject(err);
        }
        console.log(chalk.green(`Sucessfully created ${databaseName}`));
        resolve()
      });
    })
  })

}