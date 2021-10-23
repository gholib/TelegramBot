class StartHandler {
    handle(connection, bot, msg, options) {
        const chatId = msg.chat.id
        return connection.query(`SELECT name FROM bot_users WHERE chat_id=${chatId} LIMIT 1;`, (err, user) => {
            if (err) {
                return bot.sendMessage(chatId, 'Произошла ошибка.')
            }
            if (user.length) {
                return bot.sendMessage(chatId, 'Привет, ' + user[0].name + '. Что тебя интересует? 👇🏻', options);
            }
            return bot.sendMessage(chatId, 'Добро пожаловать в студию английского языка “Future Simple”.\n ' +
                'Я твой личный помощник. Я могу показать твои результаты, подготовку и финансы. ' +
                'В будущем у меня появятся новые функции для того чтобы сделать обучение ещё более эффективным ⚡️\n\n' +
                'Для начала работы тебе нужно ввести email 📧 , который ты указал(а) при регистрации в личном кабинете. ' +
                'Если не помнишь, то можешь спросить у преподавателя.');
        })
    }
}

module.exports = new StartHandler()