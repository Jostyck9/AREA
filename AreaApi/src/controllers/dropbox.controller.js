const express = require('express')
const router = express.Router()


router.get('/dropbox/webhook', (req, res) => {
	const challenge = req.originalUrl.split("challenge=")[1]
	res.writeHead(200, {'Content-Type': 'text/plain', 'X-Content-Type-Options': 'nosniff'});
	res.end(challenge)
})

router.post('/dropbox/webhook', (req, res) => {
	console.info(res)
	console.info(req)
})

module.exports = router