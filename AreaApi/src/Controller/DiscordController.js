require ('dotenv'). Config () ;
const Discord = require ('discord.js');
const bot = new Discord.Client ();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
bot.login (TOKEN);

bot.on ('ready', () => {
    console.info (`Connecté en tant que $ {bot.user.tag}!`);
});


jsonA = {"Message":"Hello World", "ToGuild":true, "guild": "TESTAREA", "channel":"test", "user":""};

jsonB = {"Message":"Hello World", "ToGuild":false, "guild": "", "channel":"", "user":"Aphi"};

/**
 * Send a specified message in Discord
 * @group Discord - Discord SendMessage Action
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
exports.sendMessage = async function (req, res) {
    //Send a specified message in Discord

    console.info(req.body);
    var obj = JSON.parse(req.body);
    if (obj.ToGuild == true) {
        bot.sendMessage(obj.Message);
        //send msg to specifi channel ou throw error
        return;
    }
    // bot.channels.get(`channelID`).send(`Text`)

    //try to send msg in dm to specified user
    //     msg.channel.send();

}

exports.receiveMessage = async function (req, res) {
    //webhook ? ou le bot sur bot.on ('message', msg => {})
}