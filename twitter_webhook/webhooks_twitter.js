const express = require ('express');
const bodyParser = require ('body-parser');
const https = require ('https');
const fs = require('fs');
const twitter_webhook = require('./server.js')
const twitterWebhooks = require('twitter-webhooks')
const app = express();
app.use(bodyParser.json());

const userActivityWebhook = twitterWebhooks.userActivity({
	serverUrl: 'https://d41bacbd.ngrok.io',
	route: '/',
    consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
	consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
	accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
    accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
	environment: 'TestArea',
	app
});
// const server = https.createServer({
// 	key: fs.readFileSync('key.pem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app);

app.listen(8080, () => {
	console.log('server start Port: 8080')
});

userActivityWebhook.register()
// userActivityWebhook.unregister({
// 	webhookId: '1231630049138356225'
// })

const token = '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn';
const secret = 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX';


// userActivityWebhook.on('event', (event, userId, data) => {
// 	console.log (userId + ' ' + event + ' ' + data.text)
// 	twitter_webhook.post_tweet(token, secret, "ALLEZ !!")
// });

// userActivityWebhook.on('unknown-event', (rawData) => {console.log (rawData)});

// app.get('/webhook/add_user', (req, res) => {
// 	res.send('Hello World!', 200)
// 	twitter_webhook.add_user_to_twitter_webhook('1098557912677576704', token, secret)
// })

// app.get('/webhook/delete_user', (req, res) => {
//     res.send('Hello World!', 200)
// 	twitter_webhook.delete_user_to_twitter_webhook('1098557912677576704', token, secret)
// })