const checkUrl = (currentUrl) => {
    const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    return urlRegexp.test(currentUrl.trim());
}

class ChangeUrl {
    checkChangeUrlCommand(msg) {
        if (msg.entities.length > 1) {
            if (msg.entities[0].type === 'bot_command') {
                if (msg.text.trim().split(',')[0] === '/changeUrl') {
                    if (checkUrl(msg.text.trim().split(',')[1])) {
                        return true
                    }
                }
            }
        }
        return false
    }

    handle(connection, bot, msg) {
        const text = msg.text
        const chatId = msg.chat.id
        return connection.query(`SELECT id FROM article_urls LIMIT 1;`, (err, res) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.');
            }
            const url = {
                url: text.trim().split(',')[1].trim()
            }
            if (res.length) {
                return connection.query(`UPDATE article_urls SET url='${url.url}' WHERE id=${res[0].id}`, (err, row) => {
                    if (err) {
                        return bot.sendMessage(chatId, 'Произошла ошибка.');
                    }
                    return bot.sendMessage(chatId, 'Ссылка успешно обновлена!');
                })
            }
            return connection.query(`INSERT INTO article_urls (url) VALUES('${url.url}');`, (err, row) => {
                if (err) {
                    return bot.sendMessage(chatId, 'Произошла ошибка.');
                }
                return bot.sendMessage(chatId, 'Ссылка успешно обновлена!');
            })
        })
    }
}

module.exports = new ChangeUrl()