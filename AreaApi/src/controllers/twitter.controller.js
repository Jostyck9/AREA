const twitterWebhooks = require('twitter-webhooks')
const connector = require('./area.controller')
var twitter = require('twit')

const CONSUMER_KEY = process.env.TWITTER_API_KEY;
const CONSUMER_SECRET = process.env.TWITTER_API_SECRET;

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

async function add_user_to_twitter_webhook(userId, userToken, secretToken) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		// TODO CHANGE URL !!!
		serverUrl: 'https://d41bacbd.ngrok.io',
		route: '/',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		environment: 'TestArea',
	});

	userActivityWebhook.subscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).catch(err => {
		console.error(err)
	});
}
exports.add_user_to_twitter_webhook = add_user_to_twitter_webhook

async function delete_user_to_twitter_webhook(userId, userToken, secretToken) {

	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://d41bacbd.ngrok.io',
		route: '/',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		environment: 'TestArea',
	});

	userActivityWebhook.unsubscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).catch(err => {
		console.error(err)
	});
}
exports.delete_user_to_twitter_webhook = delete_user_to_twitter_webhook

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

exports.UseReaction = async(action_result, area) => {

	let ts = Date.now();
	let date_ob = new Date(ts);
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	const current_time = hours + ':' + minutes + ' ' + seconds 
	if (action_result.message == area.parameters_reaction.message)
		return
	post_tweet('1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX', area.parameters_reaction.message + ' ' + current_time)
}

exports.init_twitter = async function(app) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://d41bacbd.ngrok.io',
		route: '/',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
		accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
		environment: 'TestArea',
		app
	});

	//userActivityWebhook.register()
	// const webhooks = await userActivityWebhook.getWebhook();
	// console.info(webhooks)

	// userActivityWebhook.unregister({
	// 	webhookId: '1232410338651492354'
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

exports.twitterTweet = function(area, action_result) {
    if (action_result.user == area.parameters_action.user)
        return true
    return false
}
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
		add_user_to_twitter_webhook(area.parameters_action.user, token, secret)
	} catch (error) {
		console.error(error)
	}
}


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
		delete_user_to_twitter_webhook(area.parameters_action.user, token, secret)
	} catch (error) {
		console.error(error)
	}
}