exports.run = function (connection) {
    return connection.query(`CREATE TABLE article_urls (
        id INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(70) NULL
        );`, function (err, rows) {
        if (err) throw err;
    })
}
exports.down = function(connection) {
    return connection.query(`DROP TABLE article_urls;`, function (err, rows) {
        if (err) throw err;
    })
}
