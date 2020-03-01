const AreaController = require('../controllers/area.controller')
const GithubController = require('../controllers/github.controller')
const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')


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
        message: msg.message
    };
    this.connectActionToReaction(MSG_RECEIVED_ID, action_result);
});

exports.connectActionToReaction = async function (action_id, action_result) {
    try {
        const AreaArray = await AreaModel.findByActionId(action_id);
        AreaArray.forEach(element => {
            if (this.checkIfuserIsConcerned(element, action_result, action_id)) {
                AreaController.SendToReactionById(element, action_id, action_result);
            }
        });
    }
    catch (error) {
        console.error({message: error.message || 'An internal error occured' });
    }
}

exports.checkIfuserIsConcerned = function (area, action_result, action_id) {
    switch (action_id) {
        case MSG_RECEIVED_ID:
            if (discordMessageReceived(area, action_result))
                return true;
        case MEMBER_ADD_ID:
            if (discordNewMember(area, action_result))
                return true;
        case MEMBER_BAN_ID:
            if (discordMemberBan(area, action_result))
                return true;
    }
    return false;
}

/**
 * Notice that a member was added in a Server
 * @group Discord - Discord guildMemberAdd Action
 */
bot.on('guildMemberAdd', member => {
    const action_result = {
        serverName: member.guild.name,
        member: member.user.username
    };
    this.connectActionToReaction(MEMBER_ADD_ID, action_result);
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
    this.connectActionToReaction(MEMBER_BAN_ID, action_result);
});

/**
 * Call required reaction
 * @group Discord - Discord UseReaction
 */
exports.useReaction = async(action_result, area) => {
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
exports.createChannel = async function(obj) {
    //Create a new channel in Discord

    await bot.guilds.find('name', obj.server).createChannel(obj.channel, { type: 'text' });
    bot.guilds.find('name', obj.server).channels.find('name', obj.channel).send(obj.message);
}

/**
 * Send a specified message in Discord
 * @group Discord - Discord SendMessage Reaction
 * @property {JSON} params - Message to be sent and in which channel
 * @returns {Error}  default - Unexpected error
 */
exports.sendMessage = async function (obj, action_result) {
    //Send a specified message in Discord
    bot.guilds.find('name', obj.server).channels.find('name', obj.channel).send(obj.message);
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
function discordMessageReceived(area, action_result) {
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
function discordNewMember(area, action_result) {
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
function discordMemberBan(area, action_result) {
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
 * Init all the timers of the Service
 *
 * @param {Express} app server express
 */
exports.init = async (app) => {
}