
export default function wpConnector() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    });
    return connection
}

