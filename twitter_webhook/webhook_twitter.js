const express = require ('express');
const bodyParser = require ('body-parser');
const twitterWebhooks = require('twitter-webhooks');
const https = require ('https');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const userActivityWebhook = twitterWebhooks.userActivity({
	serverUrl: 'https://3b715a35.ngrok.io',
	route: '/',
    consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
    consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
    accessToken: '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
    accessTokenSecret: 'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
	environment: 'TestArea', //default : 'env-beta'
	app
});
// userId: '1098557912677576704',
//userId: '1069147369160224768',
userActivityWebhook.register().catch(err => {
	console.log('err');
	console.log(err);
	console.log('>REGISTER<')
});
userActivityWebhook.subscribe({
    userId: '989159098905219073',
    accessToken: '989159098905219073-YupWoMi5tycLY93CQJSRrBXOkk2o59S',
    accessTokenSecret: '5RR8hx89bv90k2lj0LqoE2TtzUSVnaKRtCbVHLCmQ39jM'
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
    console.log('>Subscibe<')
});

// userActivityWebhook.unregister({
//     webhookId: '1231376835273019392'
// }).catch(err => {
//     console.log(err)
// })

userActivityWebhook.on('event', (event, userId, data) => console.log (userId + ' ' + event + ' ' + data));
userActivityWebhook.on('unknown-event', (rawData) => console.log (rawData));

const server = https.createServer({
    key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app);

server.listen(8081, () => {
    console.log('server start Port: 8081')
});

// app.post('/webhook/', (req, res) => {
//     res.send('Hello World!')
//     res.sendStatus(200)
//     console.log('ok')
// })

// app.get('/webhook/', (req, res) => {
//     res.send('Hello World!')
//     res.sendStatus(200)
//     console.log('ok')
// })

// app.get('/index', function (req, res) {
// 	console.log('test webhook')
//     res.send('Hello World!')
// })