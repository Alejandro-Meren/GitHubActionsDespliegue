const TelegramBot = require('node-telegram-bot-api');
const core = require('@actions/core');

// Obtener los inputs desde el flujo de trabajo de GitHub Actions
const token = core.getInput('telegram_token');
const chatID = core.getInput('telegram_id_user');

// Crear una instancia del bot de Telegram
const bot = new TelegramBot(token, { polling: true });

try {
  // Mensaje que será enviado al usuario de Telegram
  const message = `Workflow ejecutado correctamente tras el último commit. Saludos, ${core.getInput('user_name')}`;

  // Enviar el mensaje al chat especificado
  bot.sendMessage(chatID, message);

  // Establecer la salida en GitHub Actions
  core.setOutput('msg', 'Mensaje enviado correctamente');
} catch (error) {
  // Si ocurre un error, marcar el trabajo como fallido
  core.setFailed(error.message);
}
