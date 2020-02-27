var Github = require('github-api');


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
 });

 var ebailloux = client.getUser('Ebailloux');
 ebailloux.listStarredRepos(function(err, repos) {
    // look at all the starred repos!
 });


 /*  var hook = {
    "name": "web",
    "active": true,
    "events": [
      "push",
      "pull_request"
    ],
    "config": {
      "content_type": "json",
      "insecure_ssl": "0",
      "url": "https://localhost:8080/payloads"
     }
    }
    fork.createHook(hook)
    .then(function({data: hook}) {
      console.log("A webhook has been created which will trigger a build on push and pull request events...");
    }); */