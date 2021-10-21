const TelegramBot = require('node-telegram-bot-api')

TOKEN = '2031350902:AAGC-gDYOnBchwCfySCSj7ac7_XHZEEqW3A'
const bot = new TelegramBot(TOKEN,{polling:true})
bot.on('message', msg=>{
    console.log("ggg");
    bot.sendMessage(msg.chat.id, `hello from Heroku, ${msg.from.first_name}`)
})