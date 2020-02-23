const twitterWebhooks = require('twitter-webhooks');
var add_user_to_twitter_webhook = async function (userActivityWebhook, userId, userToken, secretToken) {
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

var delete_user_to_twitter_webhook = async function (userActivityWebhook, userId, userToken, secretToken) {
	userActivityWebhook.unsubscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	})
}