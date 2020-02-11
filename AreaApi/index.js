const Discord = require ('discord.js');
const bot = new Discord.Client ();

// const TOKEN = process.env.TOKEN;
const TOKEN = "NjY4NzU3MjkyNzAyODkyMDg4.XkJ9ww.bi81572px9jN5qxJ08QBFBiE3tw";

bot.login (TOKEN);

bot.on ('ready', () => {
    console.info (`Connecté en tant que $ {bot.user.tag}!`);
});

bot.on ('message', msg => {
    if (msg.content == 'cc' || msg.content == 'coucou' || msg.content == 'slt' || msg.content == 'bjr' || msg.content == 'salut') {
        msg.channel.send('Coucou romane');
        // msg.channel.send ('Esther la plus belle');
    }
    if (msg.content == 'dis moi la vérité' || msg.content == 'à quoi penses tu ?' || msg.content == 'oui ?' || msg.content == ':)') {
        msg.channel.send('Women > all');
    }
    if (msg.content == 'jtm' || msg.content == "est ce que tu m'aimes ?") {
        msg.channel.send('esther la plus belle <3 <3 ');
    }
})