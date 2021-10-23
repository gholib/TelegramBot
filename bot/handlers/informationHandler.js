class InformationHandler {
    check(text) {
        return text.toLowerCase() === 'Полезная информация'.toLowerCase()
    }

    handle(connection, bot, msg, options) {
        const chatId = msg.chat.id
        return connection.query(`SELECT * FROM article_urls LIMIT 1;`, (err, urls) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.', options);
            }
            if (urls.length) {
                return bot.sendMessage(chatId, urls[0].url, options);
            }
            return bot.sendMessage(chatId, 'Ничего нет.', options);
        })
    }
}

module.exports = new InformationHandler()