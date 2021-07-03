const Main=require('./utils/bot'),
client = new Main(),
mysql=require('mysql2')
const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
module.exports.db = db
client.init()