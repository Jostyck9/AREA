const twitterWebhooks = require('twitter-webhooks')

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
		serverUrl: 'https://area.web.fr.ngrok.io',
		route: '/',
		consumerKey: CONSUMER_KEY,
		consumerSecret: CONSUMER_SECRET,
		environment: 'TestArea',
	});

	userActivityWebhook.subscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	}).then(function (userActivity) {
		userActivity
		.on('favorite', (data) => console.log (userActivity.id + ' - favorite'))
		.on('tweet_create', (data) => console.log (userActivity.id + ' - tweet_create'))
		.on('follow', (data) => console.log (userActivity.id + ' - follow'))
		.on('mute', (data) => console.log (userActivity.id + ' - mute'))
		.on('revoke', (data) => console.log (userActivity.id + ' - revoke'))
		.on('direct_message', (data) => console.log (userActivity.id + ' - direct_message'))
		.on('direct_message_indicate_typing', (data) => console.log (userActivity.id + ' - direct_message_indicate_typing'))
		.on('direct_message_mark_read', (data) => console.log (userActivity.id + ' - direct_message_mark_read'))
		.on('tweet_delete', (data) => console.log (userActivity.id + ' - tweet_delete'))
	}).catch(err => {
		console.log(err)
	});
}

exports.delete_user_to_twitter_webhook = async function (userId, userToken, secretToken) {

	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://area.web.fr.ngrok.io',
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

exports.post_tweet = async function (userToken, secretToken, message) {
	var twitter = require('twit')

	// TODO change api token
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

exports.UseReaction = async(action_result, area) => {
	console.info("Twitter useReaction is on");
	console.info(action_result)

	console.info(area.parameters_reaction.message)
	//post_tweet('1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX', area.parameters_reaction.message)
}

exports.init_twitter = async function(app) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://area.web.fr.ngrok.io',
		route: '/',
		consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
		consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
		accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
		accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
		environment: 'TestArea',
		app
	});
	//userActivityWebhook.register()
	userActivityWebhook.on('event', (event, userId, data) => {
		console.log (userId + ' ' + event + ' ' + data.text)
	});
}
