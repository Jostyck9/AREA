// const Discord = require('discord.js');
// const client = new Discord.Client();

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('pong');
//   }
// });

// client.login('token');
require ('dotenv'). Config () ;
const Discord = require ('discord.js');
const bot = new Discord.Client ();

// const TOKEN = process.env.TOKEN;
const TOKEN = "NjY4NzU3MjkyNzAyODkyMDg4.XkJ9ww.bi81572px9jN5qxJ08QBFBiE3tw";

bot.login (TOKEN);

bot.on ('ready', () => {
    console.info (`Connecté en tant que $ {bot.user.tag}!`);
});

bot.on ('message', msg => {
    si (msg.content === 'ping') {
        msg.reply ('pong');
        msg.channel.send ('pong');
    }
});