// const MysqlUserName = 'chargeaccount'; // online
const MysqlUserName = 'root';  //local
const mysql = require('mysql');
let db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	database: 'chargeaccount',
	user: MysqlUserName,
	password: '112233'
})
module.exports = {
	MysqlUserName,
	db
}