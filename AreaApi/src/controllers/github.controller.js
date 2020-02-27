var Github = require('github-api');
var Promise = require("es6-promise").Promise;

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
const HOOK_URL = process.env.GITHUB_HOOK_URL;
/*
// basic auth
var gh = new Github({
    token: TOKEN
 });


exports.readDatas = async function () {
const client = gh.getUser('Ebailloux');
client.listStarredRepos()
   .then(function({data: reposJson}) {
     console.log(`client has ${reposJson.length} repos!`);
   });
}


/*
 var me = client.getUser(); // no user specified defaults to the user for whom credentials were provided
 me.listNotifications(function(err, notifications) {
    // do some stuff
 }); */


 exports.createGithubHook = async function() {

    var gh = new GitHub({
    token: TOKEN
    });

    var fork = gh.getRepo('Ebailloux', 'TESTAREA');

    var hookDef = {
        "name": "web",
        "active": true,
        "events": [
          "push",
          "pull_request"
        ],
        "config": {
        "url": HOOK_URL,
        "content_type": "json",
        "insecure_ssl": "0"
        }
    }
    fork.createHook(hookDef)
    .then(function({data: hook}) {
        console.log("A web hook has been created which will trigger a build on push and pull request events...");
    });
}