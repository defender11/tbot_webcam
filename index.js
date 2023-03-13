const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;
const filePath = process.env.FILEPATH;

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

const fs = require('fs');
const {exec} = require('child_process');
const FormData = require("form-data");
const fetch = require("node-fetch");
const moment = require("moment");

bot.setMyCommands([
  {command: "take_screen", description: "Take screen"},
]);

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', async (msg) => {

  if (msg.text === '/take_screen') {

    const chatId = msg.chat.id;

    await bot.sendChatAction(chatId, 'upload_photo');

    await exec("ffmpeg -f v4l2 -video_size 640x480 -y -i /dev/video0 -frames 1 " + filePath,
      async (error, stdout, stderr) => {

        let readStream = fs.createReadStream(filePath);

        let form = new FormData();

        form.append("photo", readStream);

        form.append("caption", moment().format("dddd, MMMM Do YYYY, HH:mm:ss"));

        await bot.sendChatAction(chatId, 'upload_photo');

        const botUrlPath = 'https://api.telegram.org/bot' + token + '/sendPhoto?chat_id=' + chatId;

        fetch(botUrlPath, {method: "POST", body: form})
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }
});