class CheckBalance {
    handle(connection, bot) {
        connection.query('SELECT * FROM bot_users', (err, users) => {
            if (err) {
                return
            }
            users.forEach(user => {
                connection.query("SELECT money FROM users WHERE id = '" + String(user.user_id) + "'", (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    let money = response[0].money;
                    if (money < 500) {
                        return bot.sendMessage(user.chat_id, 'Привет. Я заметил, что твой баланс подходит к нулю. Ты можешь, как всегда, пополнить баланс')
                    }
                })
            })
        })
    }
}

module.exports = new CheckBalance()