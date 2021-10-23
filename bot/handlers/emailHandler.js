const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class EmailHanler {
    checkEmail(msg) {
        return emailRegexp.test(msg.text)
    }

    handle(connection, bot, msg, options) {
        const chatId = msg.chat.id
        return connection.query(`SELECT email, name FROM bot_users WHERE chat_id=${chatId} LIMIT 1;`, (err, user) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.');
            }
            if (user.length) {
                return bot.sendMessage(chatId, 'Ты уже вводил e-mail!');
            }
            connection.query(`SELECT email, name FROM bot_users WHERE email='${msg.text}' LIMIT 1;`, (err, row) => {
                if (err) {
                    return bot.sendMessage(chatId, 'Произошла ошибка.');
                }
                if (row.length) {
                    return bot.sendMessage(chatId, 'Этот e-mail уже зарегестрирован!');
                }

                connection.query("SELECT id, name FROM users WHERE email = '" + msg.text + "'", (err, response) => {
                    if (!response.length) {
                        return bot.sendMessage(chatId, 'Привет, я не могу найти твой имэйл среди студентов нашей студии.\n' + 'Если ты не помнишь email, который был указан при регистрации в личном кабинете, то можешь спросить у преподавателя 👨‍💻');
                    }
                    const user = {
                        email: msg.text,
                        chatId: chatId,
                        userId: response[0].id,
                        name: response[0].name
                    }
                    return connection.query(`INSERT INTO bot_users (email, user_id, chat_id, name) VALUES('${user.email}', ${user.userId}, '${user.chatId}', '${user.name}');`, (err, row) => {
                        if (err) {
                            return bot.sendMessage(chatId, 'Произошла ошибка.');
                        }
                        return bot.sendMessage(chatId, 'Привет, ' + user.name + '. Что тебя интересует? 👇🏻', options);
                    })
                })
            })
        })
    }
}

module.exports = new EmailHanler()