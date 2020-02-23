var post_tweet = async function (consumer_key, consumer_secret, message) {
	var twitter = require('twit')

	// TODO change api token
	var T = new twitter({
		consumer_key:         consumer_key,
	  consumer_secret:      consumer_secret,
	  access_token:         '1098557912677576704-2fz3FvHUaDs5ccaje09f8YhiWpISEn',
	  access_token_secret:  'pdymBZU6dt229qycuNSyAo11cN9adU3yb2Nhkrka8CQnX',
	  timeout_ms:           60*1000,
	  strictSSL:            true,
	})
	T.post('statuses/update', { status: message }, function(err, data, res) {})
}