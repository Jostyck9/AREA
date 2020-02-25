exports.trello = (req, res) => {
    // const io = req.app.get('io')
    // const user = {
    //     name: req.user.username,
    //     photo: req.user.photos[0].value
    // }
    // io.in(req.session.socketId).emit('github', user)
    // console.log(req.user)
    // res.send({ token_github: req.query.code, token: req.session.token })
    res.send({ token: req.session.token })
    res.end()
}