const yargs = require("yargs")
var argv = require('yargs/yargs')(process.argv.slice(2)).argv
const mysql = require('mysql')
require('dotenv').config()

const botUser = require('./create_bot_users_table')
const urls = require('./create_article_urls_table')
const migrations = {
    'bot_user': botUser,
    'urls': urls,
}

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "migration name", type: "string", demandOption: true })
 .argv;

if (!options.name || !migrations[options.name]) {
    throw Error('Invalid name');
}

const migration = migrations[options.name]


const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

// run migration
if (argv.r) {
    migration.down(connection) 
} else {
    migration.run(connection)   
}

return connection.end()