
class DiscordController {
    constructor() { 
        require('dotenv').config();
        const Discord = require ('discord.js');
        const bot = new Discord.Client ();
        
        const TOKEN = process.env.DISCORD_TOKEN;
        const APP_TOKEN = process.env.DISCORD_APP_TOKEN;
        bot.login (TOKEN);
        
        bot.on ('ready', () => {
            console.info (`Connecté en tant que $ {bot.user.tag}!`);
        });
       }
    


        async discordAction() {
        const obj = {"Message":"Hello World", "ToGuild":true, "guild": "TESTAREA", "channel":"test", "user":""};


        bot.on ('message', msg => {
        console.info("There is a new message in " + msg.guild.name + ". In " +  msg.channel.name + " channel. From user : " + msg.author.username + " and it says " + msg.content);
        // receivedMessage();
        });

    
        // /**
        //  * Notice that a message was received on Discord
        //  * @group Discord - Discord receiveMessage Action
        //  * @return {JSON} - message's informations (guild, channel, author and content)
        //  * @returns {Error}  default - Unexpected error
        //  */
        // module.exports = receiveMessage = async function (req, res) {
        //     //Notice that a message was received on Discord   
        //     console.info("receivedMessage"); 
        // }
    }
    

// /**
//  * Send a specified message in Discord
//  * @group Discord - Discord SendMessage Action
//  * @property {JSON} params - Message to be sent and in which channel
//  * @returns {Error}  default - Unexpected error
//  */
// exports.sendMessage = async function (req, res) {
//     //Send a specified message in Discord

//     console.info(req.bodys);
//     const obj = req.body;
//     if (obj.ToGuild == true) {
//         console.info("sending " + obj.Message + " - to channel : " + obj.channel + " of server : " + obj.guild + " //");
//     } else {
//         console.info("sending " + obj.Message + " - to user : " + obj.user);
//     }
// }

// /**
//  * get bot url to add him to a server
//  * @group Discord - Discord get bot url
//  * @return {string} - bot's url
//  */
// exports.getBotUrl = async function (req, res) {
//     //get bot url to add him to a server
//     return BOT_URL;
// }

}