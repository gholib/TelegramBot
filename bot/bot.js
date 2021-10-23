const mysql = require('mysql')
const CheckBalance = require('./handlers/checkBalanceHandler')
const StartHandler = require('./handlers/startHandler')
const ChangeUrl = require('./handlers/changeUrlHandler')
const EmailHandler = require('./handlers/emailHandler')
const FinanceHandler = require('./handlers/financeHandler')
const ResultHandler = require('./handlers/resultHandler')
const PreparingHandler = require('./handlers/preparingHandler')
const InformationHandler = require('./handlers/informationHandler')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD
})

const moment = require('moment');

const telegramApi = require('node-telegram-bot-api');

//Сюда нужно ввести токен бота
const token = '2014800375:AAEiog73vifgpxYI4Igs2OzJ6UQlDV-1X8I'

const bot = new telegramApi(token, {polling: true});

const options = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{text: 'Финансы'}, {text: 'Результаты'}, {text: 'Подготовка'}],
            [{text: 'Полезная информация'}]
        ],
        resize_keyboard: true
    })
}


module.exports.checkBalance = () => setInterval(() => {
    CheckBalance.handle(connection, bot)
}, 604800000);


module.exports.botOn = () => {
    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return StartHandler.handle(connection, bot, msg, options)
        }

        if (msg.entities) {
            if (ChangeUrl.checkChangeUrlCommand(msg)) {
                return ChangeUrl.handle(connection, bot, msg)
            }

            if (EmailHandler.checkEmail(msg)) {
                return EmailHandler.handle(connection, bot, msg, options)
            }
            return;
        }

        if (FinanceHandler.check(text)) {
            return FinanceHandler.handle(connection, bot, msg, options)
        }

        if (ResultHandler.check(text)) {
            return ResultHandler.handle(connection, bot, msg, options, moment)
        }

        if (PreparingHandler.check(text)) {
            return PreparingHandler.handle(connection, bot, msg, options, moment)
        }

        if (InformationHandler.check(text)) {
            return InformationHandler.handle(connection, bot, msg, options)
        }

        return bot.sendMessage(chatId, 'Извини, я не понимаю тебя 🙂');
    });
}
