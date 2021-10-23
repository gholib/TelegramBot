const bot = require('./bot/bot');

const start = () => {
    bot.botOn();
    bot.checkBalance();
}

start();
