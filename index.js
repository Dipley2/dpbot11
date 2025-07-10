const mineflayer = require('mineflayer');
const express = require('express');

// Ping server (24/7 ishlashi uchun)
const app = express();
app.get('/', (req, res) => res.send('Bot tirik!'));
app.listen(3000, () => console.log('Ping server ishlamoqda.'));

const bot = mineflayer.createBot({
  host: 'hypixel.uz',
  port: 25565,
  username: 'dpbot11',
  auth: 'offline'
});

bot.on('spawn', () => {
  console.log('✅ Bot serverga kirdi!');
  bot.chat('dpbot11 onlayn!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message === 'salom') {
    bot.chat(`Salom, ${username}!`);
  }
});

bot.on('error', err => console.log('❌ Xato:', err));
bot.on('end', () => console.log('⚠️ Bot serverdan chiqib ketdi.'));
