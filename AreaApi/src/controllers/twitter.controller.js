exports.twitter = (req, res) => {
    console.log(req.user.profile)
    res.send({ token_twitter: req.user.accessToken || 'not found', secrect: req.user.tokenSecret || 'not found', token: req.session.token || 'not found'})
    req.session.destroy()
    res.end()
}
