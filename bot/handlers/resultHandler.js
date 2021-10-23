class ResultHandler {
    check(text) {
        return text.toLowerCase() === 'Результаты'.toLowerCase()
    }

    handle(connection, bot, msg, options, moment) {
        const chatId = msg.chat.id
        return connection.query(`SELECT * FROM bot_users WHERE chat_id=${chatId} LIMIT 1;`, (err, user) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.', options);
            }
            if (user.length) {
                return connection.query("SELECT title, date, rate FROM results WHERE user_id = '" + String(user[0].user_id) + "' ORDER BY date DESC LIMIT 5", (err, response) => {
                    if (err) {
                        return bot.sendMessage(chatId, 'Произошла ошибка.', options);
                    }
                    let messageText = '';
                    response.forEach(item => {
                        messageText = messageText + '✅ ' + moment(item.date).format('D.MM.YY') + ' - ' + item.title + ' - ' +item.rate +' / 100' + '\n\n';
                    })
                    return bot.sendMessage(chatId, 'Это результаты последних 5 проверочных работ. \n\n' + messageText, options);
                })
            }
        })
    }
}

module.exports = new ResultHandler()