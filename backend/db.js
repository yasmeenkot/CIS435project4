const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'newsuser',
    password: 'pa55word',
    database: 'newssitedb',
});

pool.on('connection', () => {
    console.log("Connected to the database");
})

pool.on('error', (err) => {
    console.error('Database connection error:', err.message);
});

module.exports = pool;