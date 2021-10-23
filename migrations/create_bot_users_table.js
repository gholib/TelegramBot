exports.run = function (connection) {
    return connection.query(`CREATE TABLE bot_users (
        id INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(70) NULL,
        user_id INT(12) UNSIGNED NULL,
        chat_id INT(12) UNSIGNED NULL,
        name VARCHAR(70) NULL
        );`, function (err, rows) {
        if (err) throw err;
    })
}
exports.down = function(connection) {
    return connection.query(`DROP TABLE bot_users;`, function (err, rows) {
        if (err) throw err;
    })
}
