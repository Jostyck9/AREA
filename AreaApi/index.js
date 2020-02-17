require('dotenv').config();
const Discord = require ('discord.js');
const bot = new Discord.Client ();

const testhookurl = "https://discordapp.com/api/webhooks/679074617662504993/uW5Ew-QzNLioEhvb4sFI1L134U7u_WsQs-28VPUMw-_84hX319vM_8uQwAIbTj0f8loh";

const TOKEN = process.env.DISCORD_TOKEN;
// const TOKEN = "NjY4NzU3MjkyNzAyODkyMDg4.Xkq4Rg._efpbznn71JZX6jpqich-RdqHz8";
bot.login (TOKEN);

bot.on ('ready', () => {
    console.info (`Connecté en tant que $ {bot.user.tag}!`);
});

/* test area */


bot.on ('message', msg => {
    if (msg.author.username === 'Aphi') {
        msg.channel.send("cc esther");
    }
    console.info(msg.channel.name);
});

bot.on("guildMemberAdd", (member) => {
    console.info('a new guild member approached');
    let guild = member.guild; // Reading property `guild` of guildmember object.
    const channel = member.guild.channels.find(ch => ch.name === 'test');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
 });

exports.testing = async function (req, res) {
    
const obj = {"Message":"Hello World", "ToGuild":true, "guild": "TESTAREA", "channel":"test", "user":""};
const objB = {"Message":"Hello World", "ToGuild":false, "guild": "", "channel":"", "user":"Aphi"};

    if (obj.ToGuild == true) {
        bot.channels.get(`test`).send('coucou');
    }
}
    // if (obj.ToGuild == true) {
    //     // bot.channels.get(``).send(`Text`);
    //     //send msg to specific channel ou throw error
    // }
    // else 
    // console.info("obj.ToGuild is false");
    // bot.channels.get(`channelID`).send(`Text`)

    // try to send msg in dm to specified user
    //     msg.channel.send();




/* GESTION DES MESSAGES */

// bot.on ('message', msg => {
//     if (msg.author.username === 'spiritangry')
//         msg.channel.send('Je rigolais Gabin pardonnes moi');
//     // msg.channel.send('name is : ' + msg.author.username + 'id is : ' + msg.author.id)
//     if(msg.content == "!ping"){ // Check if message is "!ping" 
//         msg.channel.send("Pinging ...").then((msg) => { // Resolve promise
//             msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits msg with current timestamp minus timestamp of msg
//         });
//     }
//     if (msg.content == 'cc' || msg.content == 'coucou' || msg.content == 'slt' || msg.content == 'bjr' || msg.content == 'salut') {
//         msg.channel.send('Coucou');
//         msg.react("🤔"); // Yes
//         // msg.channel.send ('Esther la plus belle');
//     }
// })


// /* GESTION DES GUILDES */
