const AreaController = require('../controllers/area.controller')
const GithubController = require('../controllers/github.controller')


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
     const action_result = {
        serverName: msg.guild.name,
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
    await this.sendMessage(area.parameters_reaction);
}


/**
 * Send a specified message in Discord
 * @group Discord - Discord SendMessage Action
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
exports.sendMessage = async function (obj) {
    //Send a specified message in Discord
    bot.guilds.find('name', obj.server).channels.find('name', obj.channel).send(obj.content);
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
exports.discordMessageReceived = function(area, action_result) {
    if (action_result.serverName == area.parameters_action.server && action_result.channelName == area.parameters_action.channel) {
        return true;
    }
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


// TEMPORARY

exports.spotifyNewMusic = async function(area, action_result) {
    return false;
}
exports.outlookMailReceived = async function(area, action_result) {
    return false;
}
exports.outlookEventCreated = async function(area, action_result) {
    return false;
}
exports.trelloCardAdded = async function(area, action_result) {
    return false;
}
exports.trelloDeadline = async function(area, action_result) {
    return false;
}
exports.onedriveFileDeleted = async function(area, action_result) {
    return false;
}
exports.onedriveFileAdded = async function(area, action_result) {
    return false;
}