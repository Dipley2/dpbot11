const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot tirik!'));
app.listen(3000, () => console.log('Ping server ishlamoqda.'));

const bot = mineflayer.createBot({
  host: 'hypixel.uz',
  port: 25565,
  username: 'dpbot11',
  auth: 'offline',
  version: '1.20.1' // MUHIM: server versiyasi bilan bir xil
});

const password = 'parol';

bot.on('spawn', () => {
  console.log('✅ Bot serverga kirdi!');

  setTimeout(() => {
    bot.chat(`/register ${password} ${password}`);
    bot.chat(`/login ${password}`);
    console.log(`🔐 Avto-login/register: ${password}`);
  }, 3000);

  bot.chat('dpbot11 onlayn!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;

  const msg = message.toLowerCase();

  if (msg === 'salom') {
    bot.chat(`Salom, ${username}!`);
  }

  if (msg === 'tp') {
    bot.chat(`/tp ${username}`);
  }
});

// Faqat `dipleyggz` yuborgan TPA ni qabul qiladi
bot.on('message', (jsonMsg) => {
  const msg = jsonMsg.toString().toLowerCase();

  if (
    msg.includes('teleport') &&
    msg.includes('request') &&
    msg.includes('dipleyggz')
  ) {
    console.log('📨 TPA so‘rovi DIPLEYGGZdan olindi. Qabul qilinyapti!');
    setTimeout(() => {
      bot.chat('/tpaccept');
    }, 1000);
  } else if (msg.includes('teleport') && msg.includes('request')) {
    console.log('⚠️ Boshqadan tpa kelgan, qabul qilinmadi.');
  }
});

// ❌ Xatoliklarni ko‘rsat
bot.on('error', err => console.log('❌ Xatolik:', err));
bot.on('end', () => console.log('⚠️ Bot serverdan chiqib ketdi.'));
