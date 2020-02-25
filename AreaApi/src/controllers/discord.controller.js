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

/**
 * Notice that a message was received on Discord
 * @group Discord - Discord receiveMessage Action
 */
bot.on ('message', msg => {
    if (msg.channel.type === "dm") {
        console.info("There is a new private message from user : " + msg.author.username + " and it says " + msg.content);
        return;
    }
    else
        console.info("There is a new message in " + msg.guild.name + ". In " +  msg.channel.name + " channel. From user : " + msg.author.username + " and it says " + msg.content);
    const action_result = {
        guildName: msg.guild.name,
        channelName: msg.channel.name,
        author: msg.author.username,
        content: msg.content
    };
    AreaController.connectActionToReaction(MSG_RECEIVED_ID, action_result);
});


/**
 * Notice that a member was added in a Server
 * @group Discord - Discord guildMemberAdd Action
 */
bot.on('guildMemberAdd', member => {
    channel = member.guild.channels.find("name","test").send("Welcome!" + member.user.username);
    const action_result = {
        serverName: member.guild.name,
        member: member.user.username
    };
    AreaController.connectActionToReaction(MEMBER_ADD_ID, action_result);
});


/**
 * Call required reaction
 * @group Discord - Discord UseReaction
 */
exports.UseReaction = async(action_result, area) => {
    //Call required reaction
    console.info("Discord useReaction is on");
    this.sendMessage(area.parameters_action);
}


/**
 * Send a specified message in Discord
 * @group Discord - Discord SendMessage Action
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
exports.sendMessage = async function (obj) {
    //Send a specified message in Discord
    if (obj.server == "dm")
        console.info("sending " + obj.content + " - to channel : " + obj.channel + " of server : " + obj.server + " //");
    else
        console.info("sending " + obj.content + " - to user : " + obj.channel);
}

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
 * Check if the action_result matches an area's action parameters
 * @group Discord - DiscordMessageReceived
 * @return {bool} - true if it does match
 * @return {bool} - false if it doesn't match
 */
exports.discordMessageReceived = async function(area, action_result) {
    if (action_result.serverName = area.parameters_action.server && action_result.channelName == area.parameters_action.channel)
        return true
    return false
}

/**
 * Check if the action_result matches an area's action parameters
 * @group Discord - DiscordNewMember
 * @return {bool} - true if it does match
 * @return {bool} - false if it doesn't match
 */
exports.discordNewMember = async function(area, action_result) {
    if (action_result.serverName = area.parameters_action.server)
        return true
    return false
}
