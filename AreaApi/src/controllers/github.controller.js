var github = require('octonode');

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
const TOKEN = process.env.GITHUB_TOKEN;

var client = github.client(TOKEN);

exports.CreateRepo = async() => {
    await client.me().repo({
        "name": "Hello-World",
        "description": "This is your first repo",
    });
 } //repo
//async function getPullRequests (params) {
 /*   const client = github.client(params.githubAccessToken);
    const repo = client.repo("Area");

    const result = await repo.prsAsync({ per_page: 100 });
    return result[0];*/
  //}