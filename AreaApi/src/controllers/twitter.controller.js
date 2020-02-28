const twitterWebhooks = require('twitter-webhooks')
const connector = require('./area.controller')
const twitter = require('twit')
const app = require('../app')

const CONSUMER_KEY = process.env.TWITTER_API_KEY;
const CONSUMER_SECRET = process.env.TWITTER_API_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const TWITTER_ENV = process.env.TWITTER_ENV;

exports.twitter = (req, res) => {
    // const io = req.app.get('io')
    console.log(req.query.oauth_token)
    console.log(req.user)
    // const user = {
    //     name: req.user.username,
    //     photo: req.user.photos[0].value.replace(/_normal/, '')
    // }

    // io.in(req.session.socketId).emit('user', req.user)
    // res.send({ token_twitter: req.query.oauth_token
    res.send({ token_twitter: req.query.oauth_token, token: req.session.token })
    req.session.destroy();
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
* use the reaction of the service twitter
*
* @param {json} action_result the data received from the action
* @param {json} area the area use in here
*/
exports.UseReaction = async(action_result, area) => {

	let ts = Date.now();
	let date_ob = new Date(ts);
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	const current_time = hours + ':' + minutes + ' ' + seconds 
	if (action_result.message == area.parameters_reaction.message)
		return
	post_tweet('1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX', area.parameters_reaction.message)
}

/**
* init the webhooks of Twitter and start to catch event
*
* @param {Express} app server express
*/
exports.init_twitter = async function(app) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: SERVER_URL,
		route: '/twitter/webhooks',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
		accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
		environment: TWITTER_ENV,
		app
	});
	// const webhooks = await userActivityWebhook.getWebhook();
	// console.info(webhooks)
	// if (webhooks.length == 0)
	// 	userActivityWebhook.register()
	// userActivityWebhook.unregister({
	// 	webhookId: '1232769805637296131'
	// })
	userActivityWebhook.on('event', (event, userId, data) => {
		if (event == 'tweet_create') {
			const action_result = {
				user: userId,
				message: data.text
			}
			connector.connectActionToReaction(2, action_result);
		}
	});
}

/**
* check the action come from him
*
* @param {json} area the area use here
* @param {json} action_result the data received from the action
* @returns {boolean} if the action come from him or not
*/
exports.twitterTweet = function(area, action_result) {
    if (action_result.user == area.parameters_action.user)
        return true
    return false
}

/**
* create the action twitter
*
* @param {json} area the new area in creation
*/
// NOTE the area don't must to be in the database
// NOTE get access token, secret token and user ID from twitter
exports.createTwitterTweet = async function(area) {
	if (area.action_id != 2)
		return
	// TODO get twitter user ID from database
	area.parameters_action.user = '1098557912677576704'
	try {
		const AreaArray= await AreaModel.findByActionId(2);
		AreaArray.forEach(element => {
			if (element.client_id == area.client_id) {
				return
			}
		});
		const token = '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn';
		const secret = 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX';
		subscribe_to_twitter_webhook(area.parameters_action.user, token, secret)
	} catch (error) {
		console.error(error)
	}
}

/**
* destroy the action twitter
*
* @param {json} area the new area in destruction
*/
// NOTE the area don't must to be in the database
// NOTE get access token, secret token from twitter
exports.destructionTwitterTweet = async function(area) {
	if (area.action_id != 2)
		return
	// TODO get twitter user ID from database
	try {
		const AreaArray= await AreaModel.findByActionId(2);
		AreaArray.forEach(element => {
			if (element.client_id == area.client_id) {
				return
			}
		});
		const token = '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn';
		const secret = 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX';
		unsubscribe_to_twitter_webhook(area.parameters_action.user, token, secret)
	} catch (error) {
		console.error(error)
	}
}