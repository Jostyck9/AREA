const twitterWebhooks = require('twitter-webhooks')

const CONSUMER_KEY = process.env.TWITTER_API_KEY;
const CONSUMER_SECRET = process.env.TWITTER_API_SECRET;

var add_user_to_twitter_webhook = async function (userId, userToken, secretToken) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		// TODO CHANGE URL !!!
		serverUrl: 'https://42870df0.ngrok.io',
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

var delete_user_to_twitter_webhook = async function (userId, userToken, secretToken) {

	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://42870df0.ngrok.io',
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

var post_tweet = async function (userToken, secretToken, message) {
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

exports.add_user_to_twitter_webhook = add_user_to_twitter_webhook;
exports.delete_user_to_twitter_webhook = delete_user_to_twitter_webhook;
exports.post_tweet = post_tweet;

exports.UseReaction = async(action_result, area) => {
	console.info("Twitter useReaction is on");
	console.info(action_result)
}