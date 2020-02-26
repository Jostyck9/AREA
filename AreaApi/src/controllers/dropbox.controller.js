exports.dropbox = (req, res) => {
    console.log(req.user.profile)
    res.send({ token_dropbox: req.user.accessToken || 'not found', token: req.query.state || 'not found'})
    res.end()
} 