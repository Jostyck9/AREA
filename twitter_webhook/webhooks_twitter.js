const twitterWebhooks = require('twitter-webhooks');
var add_user_to_twitter_webhook = async function (userId, userToken, secretToken) {
	const userActivityWebhook = twitterWebhooks.userActivity({
		serverUrl: 'https://d15cdcc3.ngrok.io',
		route: '/',
		consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
		consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
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
		serverUrl: 'https://d15cdcc3.ngrok.io',
		route: '/',
		consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
		consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
		environment: 'TestArea',
	});

	userActivityWebhook.unsubscribe({
		userId: userId,
		accessToken: userToken,
		accessTokenSecret: secretToken
	})
}

const express = require ('express');
const bodyParser = require ('body-parser');
const https = require ('https');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const userActivityWebhook = twitterWebhooks.userActivity({
	serverUrl: 'https://d15cdcc3.ngrok.io',
	route: '/',
    consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
	consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
	accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
    accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
	environment: 'TestArea',
	app
});
const server = https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app);

server.listen(8081, () => {
	console.log('server start Port: 8081')
});

//userActivityWebhook.register()
// userActivityWebhook.unregister({
// 	webhookId: '1231610176232415232'
// })

//add_user_to_twitter_webhook('1098557912677576704', '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX')
//delete_user_to_twitter_webhook('1098557912677576704', '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn', 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX')


userActivityWebhook.on('event', (event, userId, data) => console.log (userId + ' ' + event + ' ' + data));
userActivityWebhook.on('unknown-event', (rawData) => console.log (rawData));