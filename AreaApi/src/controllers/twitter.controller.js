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

exports.add_user_to_twitter_webhook = async function (userId, userToken, secretToken) {
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
		console.log(err)
	});
}

exports.delete_user_to_twitter_webhook = async function (userId, userToken, secretToken) {

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
	})
}

async function post_tweet(userToken, secretToken, message) {
	var T = new twitter({
		consumer_key: CONSUMER_KEY,
	  	consumer_secret: CONSUMER_SECRET,
	  	access_token: userToken,
	  	access_token_secret: secretToken,
	  	timeout_ms: 60*1000,
	  	strictSSL: true,
	})
	T.post('statuses/update', { status: message }, function(err, data, res) {})
}
//exports.post_tweet = post_tweet

exports.UseReaction = async(action_result, area) => {

	let ts = Date.now();
	let date_ob = new Date(ts);
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	const current_time = hours + ':' + minutes + ' ' + seconds 
	console.info(area.parameters_reaction.message + ' ' + current_time)
	if (action_result.message == area.parameters_reaction.message)
		return
	await post_tweet('1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX', area.parameters_reaction.message + ' ' + current_time)
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