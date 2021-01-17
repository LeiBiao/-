const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'xz',
    connectionLimit: '20' //设置连接池大小
})
module.exports = pool;