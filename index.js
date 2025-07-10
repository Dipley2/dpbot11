const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot tirik!'));
app.listen(3000, () => console.log('Ping server ishlamoqda.'));

const bot = mineflayer.createBot({
  host: 'hypixel.uz',
  port: 25565,
  username: 'dpbot11',
  auth: 'offline'
});

const password = 'dpbot24';

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
    console.log(`📡 /tp ${username} komanda yuborildi`);
  }
});

// 👇 Faqat dipleyggz yuborgan tpa so‘rovlarini qabul qiladi
bot.on('message', (jsonMsg) => {
  const msg = jsonMsg.toString().toLowerCase();

  // Shart: "dipleyggz" tpa tashlasa va bu so‘rov matni chiqsa
  if (
    msg.includes('teleport') &&
    msg.includes('request') &&
    msg.includes('dipleyggz')
  ) {
    console.log('📨 TPA so‘rovi DIPLEYGGZdan olindi. Qabul qilinyapti!');
    setTimeout(() => {
      bot.chat('/tpaccept');
    }, 1000); // 1 soniya kutish
  } else if (msg.includes('teleport') && msg.includes('request')) {
    console.log('⚠️ Boshqa o‘yinchidan tpa kelgan, e’tibor berilmadi.');
  }
});

bot.on('error', err => console.log('❌ Xato:', err));
bot.on('end', () => console.log('⚠️ Bot serverdan chiqib ketdi.'));
