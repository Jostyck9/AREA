const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')
const ReactionModel = require('../models/Reaction.model')
const AreaController = require('../controllers/area.controller')

require('dotenv').config();
const Discord = require ('discord.js');

const bot = new Discord.Client ();

const MSG_RECEIVED_ID = 6;
const MEMBER_ADD_ID = 7;
const TOKEN = process.env.DISCORD_TOKEN;
const BOT_URL = process.env.DISCORD_BOT_URL;

bot.login (TOKEN);
bot.on ('ready', () => {
    console.info (`Connecté en tant que ${bot.user.tag}`);
});

exports.create = async(req, res) => {
    const obj = {"Message":"Hello World", "ToGuild":true, "guild": "TESTAREA", "channel":"test", "user":""};
}

bot.on ('message', msg => {
    if (msg.channel.type === "dm") {
        console.info("There is a new private message from user : " + msg.author.username + " and it says " + msg.content);
        return;
    }
    else
        console.info("There is a new message in " + msg.guild.name + ". In " +  msg.channel.name + " channel. From user : " + msg.author.username + " and it says " + msg.content);
    // receivedMessage();
    const action_result = {
        guildName: msg.guild.name,
        channelName: msg.channel.name,
        author: msg.author.username,
        content: msg.content
    };
    AreaController.connectActionToReaction(MSG_RECEIVED_ID, action_result);
    //cc
});

bot.on('guildMemberAdd', member => {
    channel = member.guild.channels.find("name","test").send("Welcome!" + member.user.username);
});

exports.UseReaction = async(client_id, action_result, reaction_id) => {
    console.info("Discord useReaction is on");
}

async function receiveMessage() {
    //get les infos de la db
    //check si dans la db qqn est interessé par le msg
    //si oui --> call connectorcontroller(id_receivemsg, le msg et son auteur etc dans un json)
    // si non osef
}

async function newMemberArrival() {
    //get les infos de la db
    //check si dans la db qqn est interessé par le msg
    //si oui --> call connectorcontroller(id_receivemsg, le msg et son auteur etc dans un json)
    // si non osef
}

async function sendMessage(res) {
    //a la prochaine action faut envoyer tel msg
}

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

/**
 * get bot url to add him to a server
 * @group Discord - Discord get bot url
 * @return {string} - bot's url
 */
exports.getBotUrl = async function (req, res) {
    //get bot url to add him to a server
    return BOT_URL;
}


/**
 * call adequate reaction
 * @group Discord - Discord redirect to adequate reaction
 */
exports.useToAction = async function (reaction_id, res) {
    //call adequate reaction
}