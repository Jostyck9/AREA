const AreaController = require('../controllers/area.controller')
const GithubController = require('../controllers/github.controller')


require('dotenv').config();
const Discord = require ('discord.js');

const bot = new Discord.Client ();

const MSG_RECEIVED_ID = 4;
const MEMBER_ADD_ID = 5;
const MEMBER_BAN_ID = 6;
const SEND_MESSAGE_ID = 2;
const CREATE_CHANNEL_ID = 3;
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
 * Notice that a member was added in a Server
 * @group Discord - Discord guildMemberAdd Action
 */
bot.on("guildBanAdd", function(guild, user){
    const action_result = {
        serverName: guild.name,
        member: user.username
    };
    AreaController.connectActionToReaction(MEMBER_BAN_ID, action_result);
});

/**
 * Call required reaction
 * @group Discord - Discord UseReaction
 */
exports.UseReaction = async(action_result, area) => {
    //Call required reaction

    if (area.reaction_id == SEND_MESSAGE_ID)
        await this.sendMessage(area.parameters_reaction, action_result);
    if (area.reaction_id == CREATE_CHANNEL_ID)
        await this.createChannel(area.parameters_reaction);
}


/**
 * Create a new channel in Discord
 * @group Discord - Discord createChannel Reaction
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
async function createChannel(obj) {
    //Create a new channel in Discord

    await bot.guilds.find('name', obj.server).createChannel(obj.channel, { type: 'text' });
    bot.guilds.find('name', obj.server).channels.find('name', obj.channel).send(obj.content);
}

/**
 * Send a specified message in Discord
 * @group Discord - Discord SendMessage Reaction
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
async function sendMessage(obj, action_result) {
    //Send a specified message in Discord
    bot.guilds.find('name', obj.server).channels.find('name', obj.channel).send(obj.content);
}

/**
 * get bot url to add him to a server
 * @group Discord - Discord get bot url
 * @return {string} - bot's url
 */
exports.getBotUrl = function () {
    //get bot url to add him to a server
    return BOT_URL;
}


/**
 * Check if the action_result matches an area's action parameters
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
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
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Discord - DiscordNewMember
 * @return {bool} - true if it does match
 * @return {bool} - false if it doesn't match
 */
exports.discordNewMember = function(area, action_result) {
    if (action_result.serverName = area.parameters_action.server)
        return true
    return false
}

/**
 * Check if the action_result matches an area's action parameters
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Discord - DiscordMemberBan
 * @return {bool} - true if it does match
 * @return {bool} - false if it doesn't match
 */
exports.discordMemberBan = function(area, action_result) {
    if (action_result.serverName = area.parameters_action.server)
        return true
    return false
}

//NOTE ========================================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
    try {
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Delete the area (specific for each service (for exemple , delete the timer inthe time table))
 *
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
    try {
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 *
 * @param {JSON} actionResult -
 */
exports.useReaction = async (actionResult, area) => {
}

/**
 * Init all the timers of the Service
 *
 * @param {Express} app server express
 */
exports.init = async (app) => {
}