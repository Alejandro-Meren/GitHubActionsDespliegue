const TelegramBot = require('node-telegram-bot-api');
const core = require ('@actions/core')

const token = core.getInput("telegram-token")
const chatID = core.getInput("teelgram-id-user")

const bot = new TelegramBot(token, {polling: true});

try {
    const message = `WorkFlow ejecutado correctamente tras el ultimo commit. Saludos ${core.getInput("user_name")}`;

    bot.sendMessage(chatID, message)
    core.setOutput("msg", "Mensaje enviado correctamente")
} catch (error) {
    core.setFailed(error.message)
}