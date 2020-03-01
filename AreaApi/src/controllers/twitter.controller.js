const twitterWebhooks = require('twitter-webhooks')
const AreaController = require('./area.controller')
const twitter = require('twit')

const CONSUMER_KEY = process.env.TWITTER_KEY;
const CONSUMER_SECRET = process.env.TWITTER_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const TWITTER_ENV = process.env.TWITTER_ENV;
const TWITTER_TOKEN = process.env.TWITTER_TOKEN
const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET
const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')
const ServiceToken = require('../models/ServiceTokens.model')
const AreaModel = require('../models/Area.model')
const ActionModel = require('../models/Action.model')

/**
 * twitter connect the token received to the database
 * 
 * @param {any} req the request
 * @param {any} res the res
 */
exports.twitter = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('twitter')
        if (!resService)
            throw new Error("Unkown service twitter")

        ServiceAuthController.connect(
            req.userArea.id,
            {
                access_token: req.user.accessToken || null,
                refresh_token: null,
                secret_token: req.user.tokenSecret || null,
                expires_in: null,
            },
            resService.id,
            req.urlCallback.url,
            res
        )
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}


/**
* subscribe a user for the webhooks twitter
*
* @param {string} userId user id from twitter
* @param {string} userToken access token from tiwtter
* @param {string} secretToken secret token from tiwtter
*/
async function subscribe_to_twitter_webhook(userId, userToken, secretToken) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		// TODO CHANGE URL !!!
		serverUrl: SERVER_URL,
		route: '/twitter/webhooks',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		environment: TWITTER_ENV,
	});

	userActivityWebhook.subscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).catch(err => {
		console.error(err)
	});
}
exports.subscribe_to_twitter_webhook = subscribe_to_twitter_webhook

/**
* unsubscribe a user for the webhooks twitter
*
* @param {string} userId user id from twitter
* @param {string} userToken access token from tiwtter
* @param {string} secretToken secret token from tiwtter
*/
async function unsubscribe_to_twitter_webhook(userId, userToken, secretToken) {

	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: SERVER_URL,
		route: '/twitter/webhooks',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		environment: TWITTER_ENV,
	});

	userActivityWebhook.unsubscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).catch(err => {
		console.error(err)
	});
}
exports.unsubscribe_to_twitter_webhook = unsubscribe_to_twitter_webhook

/**
* post a tweet directly on Twitter
*
* @param {string} userToken access token from tiwtter
* @param {string} secretToken secret token from tiwtter
* @param {string} message the message to post
*/
async function post_tweet(userToken, secretToken, message) {
	var T = new twitter({
		consumer_key: CONSUMER_KEY,
	  	consumer_secret: CONSUMER_SECRET,
	  	access_token: userToken,
	  	access_token_secret: secretToken,
	  	timeout_ms: 60*1000,
	  	strictSSL: true,
	})
	T.post('statuses/update', { status: message }, function(err, data, res) {}).catch(err => {
		console.error(err)
	})
}
exports.post_tweet = post_tweet

/**
* check the action come from him
*
* @param {json} area the area use here
* @param {json} action_result the data received from the action
* @returns {boolean} if the action come from him or not
*/
exports.twitterTweet = async function(area, action_result) {
	const ResService = await ServiceModel.findByName('twitter')
	if (ResService == null) {
		return false
	}
	const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, area.client_id)
	if (UserToken == null) {
		return false
	}
	const userId = UserToken.access_token.split("-")[0];
	console.log(userId)
	console.log(action_result.user)
	if (action_result.user == userId) {
		return true
	}
    return false
}

/**
* Create specific data for the area (for example init a Twitter webhook for this area)
*
* @param {json} area the new area in creation
*/
exports.createArea = async (area) => {
	if (area.action_id != 2)
		return
    try {
		const AreaArray = await AreaModel.findByActionId(area.action_id);
		for (const element in AreaArray) {
			if (AreaArray[element].client_id == area.client_id && AreaArray[element].id != area.id) {
				return
			}
		}
		const ResService = await ServiceModel.findByName('twitter')
		if (ResService == null) {
			return
		}
		const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, area.client_id)
		if (UserToken == null) {
			return
		}
		const token = UserToken.access_token;
		const secret = UserToken.secret_token;
		const userId = token.split("-")
		subscribe_to_twitter_webhook(userId[0], token, secret)
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
* Delete specific data for the area (for example delete a Twitter webhook for this area)
*
* @param {json} area the new area in creation
*/
exports.deleteArea = async (area) => {
	if (area.action_id != 2)
		return
    try {
		const AreaArray = await AreaModel.findByActionId(area.action_id);
		for (const element in AreaArray) {
			if (AreaArray[element].client_id == area.client_id) {
				return
			}
		}
		const ResService = await ServiceModel.findByName('twitter')
		if (ResService == null)
			return
		const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, area.client_id)
		if (UserToken == null)
			return
		const token = UserToken.access_token;
		const secret = UserToken.secret_token;
		const userId = token.split("-")
		unsubscribe_to_twitter_webhook(userId[0], token, secret)
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
* Call the appropriate reaction from area of the service
*
* @param {json} actionResult the result from the action
* @param {json} area the current area
*/
exports.useReaction = async (actionResult, area) => {
	const ResService = await ServiceModel.findByName('twitter')
	if (ResService == null)
		return
	const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, area.client_id)
	if (UserToken == null)
		return
	const token = UserToken.access_token;
	const secret = UserToken.secret_token;
	if (actionResult.message == area.parameters_reaction.message)
		return
	post_tweet(token, secret, area.parameters_reaction.message)
}

/**
 * Init all the Twitter webhook of the Service
 * 
 * @param {Express} app server express
 */
exports.init = async (app) => {
	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: SERVER_URL,
		route: '/twitter/webhooks',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		accessToken: TWITTER_TOKEN,
		accessTokenSecret: TWITTER_TOKEN_SECRET,
		environment: TWITTER_ENV,
		app
	});
	const webhooks = await userActivityWebhook.getWebhook();
	if (webhooks.length == 0)
		userActivityWebhook.register()
	userActivityWebhook.on('event', (event, userId, data) => {
		if (event == 'tweet_create') {
			const action_result = {
				user: userId,
				message: data.text
			}
			this.connectActionToReaction(2, action_result);
		}
	});
}

/**
 * Call the reaction from the area
 *
 * @param {string} action_id id of the action
 * @param {json} actionResult the result from the action
 */
exports.connectActionToReaction = async function connectActionToReaction(action_id, action_result) {
	try {
        const AreaArray = await AreaModel.findByActionId(action_id);
		if (AreaArray == null)
			return
		AreaArray.forEach(element => {
        	if (this.checkIfuserIsConcerned(element, action_result)) {
                AreaController.SendToReactionById(element, action_id, action_result);
            }
        });

    }
    catch (error) {
		console.error(error)
	}
}

/**
* Verif if the user of concerned with the area give in parameters
*
* @param {json} area current area
* @param {json} actionResult the result from the action
* @returns {boolean} true if the user is concerned
*/
exports.checkIfuserIsConcerned = async function checkIfuserIsConcerned(area, action_result) {
	const ResService = await ServiceModel.findByName('twitter')
	if (ResService == null) {
		return false
	}
	const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, area.client_id)
	if (UserToken == null) {
		return false
	}
	const userId = UserToken.access_token.split("-")[0];
	if (action_result.user == userId) {
		return true
	}
    return false
}