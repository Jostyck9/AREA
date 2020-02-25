exports.spotify = (req, res) => {
    // const io = req.app.get('io')
    console.log(req.query.oauth_token)
    console.log(req.user)
    // const user = {
    //     name: req.user.username,
    //     photo: req.user.photos[0].value.replace(/_normal/, '')
    // }

    // io.in(req.session.socketId).emit('user', req.user)
    // res.send({ token_twitter: req.query.oauth_token
    res.send({token: req.session.token })
    req.session.destroy();
}
