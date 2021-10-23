class FinanceHandler {
    check(text) {
        return text.toLowerCase() === 'Финансы'.toLowerCase()
    }

    handle(connection, bot, msg, options) {
        const chatId = msg.chat.id
        return connection.query(`SELECT * FROM bot_users WHERE chat_id=${chatId} LIMIT 1;`, (err, user) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.', options);
            }
            if (user.length) {
                return connection.query("SELECT money FROM users WHERE id = '" + String(user[0].user_id) + "'", (err, response) => {
                    if (err) {
                        return bot.sendMessage(chatId, 'Произошла ошибка.', options);
                    }
                    let money = response[0].money;
                    if (money < 500) {
                        return bot.sendMessage(chatId, 'На твоём счету ' + money + ' рублей. Рекомендуем пополнить баланс 💳')
                    }
                    return bot.sendMessage(chatId, 'На твоём счету ' + money + ' рублей. Все в порядке 👍🏻')
                })
            }
        })
    }
}

module.exports = new FinanceHandler()