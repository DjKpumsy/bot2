const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

const port = 3000;
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});

const token = '7124173662:AAHcImyR5F9f4DwzQBAYOSNxyORJu-XVuY4';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    const telegramId = msg.from.id;

    const webAppUrl = `https://frontzx.vercel.app/`;

    bot.sendMessage(chatId, `Welcome! Click the button below to start.`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Open Web App',
                        web_app: { url: webAppUrl }
                    }
                ]
            ]
        }
    });

    axios.post('https://back-w4s1.onrender.com/auth', {
        telegramId,
        username
    }).catch(err => console.error(err));
});

bot.onText(/\/referral (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const referrerId = match[1];
    const newUserId = msg.from.id;

    axios.post('https://back-w4s1.onrender.com/referral', {
        referrerId,
        newUserId
    }).catch(err => console.error(err));
});
