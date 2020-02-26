exports.facebook = (req, res) => {
    console.log(req.user.profile)
    res.send({ token_facebook: req.user.accessToken || 'not found', refresh: req.user.refreshToken || 'not found', token: req.query.state || 'not found'})
    res.end()
} 