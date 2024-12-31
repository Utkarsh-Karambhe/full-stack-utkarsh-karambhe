const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   // or your MySQL host
  user: 'utkarshassignment',
  password: 'gmail@1234',
  database: 'cricket_match'
});

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
