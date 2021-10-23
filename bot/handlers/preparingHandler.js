const changeData = (ready) => {
    switch (ready) {
        case 0:
            return 'не готов ❌'
        case 1:
            return 'частичная подготовка 🟡'
        case 2:
            return 'готов ✅'
    }
}

class PreparingHandler {
    check(text) {
        return text.toLowerCase() === 'Подготовка'.toLowerCase()
    }

    handle(connection, bot, msg, options, moment) {
        const chatId = msg.chat.id
        return connection.query(`SELECT * FROM bot_users WHERE chat_id=${chatId} LIMIT 1;`, (err, user) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.', options);
            }
            if (user.length) {
                return connection.query("SELECT ready, data FROM offs WHERE user_id = '" + String(user[0].user_id) + "' ORDER BY data DESC LIMIT 5", (err, response) => {
                    if (err) {
                        return bot.sendMessage(chatId, 'Произошла ошибка.', options);
                    }
                    if (response.length) {
                        let messageText = '';
                        response.forEach(item => {
                            messageText = messageText + moment(item.data).format('D.MM.YY') + ' - ' + changeData(item.ready) + '\n\n';
                        })
                        return bot.sendMessage(chatId, 'Ваша подготовка за последние пять занятий 👩🏼‍💻 \n\n' + messageText, options);
                    }
                    return bot.sendMessage(chatId, 'Ничего нет.', options);
                })
            }
        })
    }
}

module.exports = new PreparingHandler()