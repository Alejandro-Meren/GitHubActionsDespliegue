const TelegramBot = require('node-telegram-bot-api')
const core = require('@actions/core')

const token = core.getInput("telegram_token")
const chatID = core.getInput("telegram_id_user")

const bot = new TelegramBot(token, {polling: true});

try {

    const message = `Workflow ejecutando correctamente tras el ultimo commit. Saludos ${core.getInput("user_name")}`;
    bot.sendMessage(chatID, message)
    core.setOutput("msg", "Mensaje enviado correctamente")
} catch (error) {
    core.setFailed(error.message)
    
}