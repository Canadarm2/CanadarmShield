const Main=require('./utils/bot'),
client = new Main(),
mysql=require('mysql2')
const db = mysql.createPool({
  host: client.config.host,
  user: client.config.user,
  password: client.config.password,
  database: client.config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
module.exports.db = db
client.init()