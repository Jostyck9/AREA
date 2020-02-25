exports.github = (req, res) => {
    // const io = req.app.get('io')
    // const user = {
    //     name: req.user.username,
    //     photo: req.user.photos[0].value
    // }
    // io.in(req.session.socketId).emit('github', user)
    console.log(req)
    res.send({ token_github: req.query.code, token: req.session.token })
    // res.send({ token: req.session.token })
    res.end()
}
//var github = require('octonode');

/*
client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
}); */

//async function getPullRequests (params) {
 /*   const client = github.client(params.githubAccessToken);
    const repo = client.repo("Area");

    const result = await repo.prsAsync({ per_page: 100 });
    return result[0];*/
  //}