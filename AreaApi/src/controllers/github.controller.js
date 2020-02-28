var Github = require('github-api');
var Promise = require("es6-promise").Promise;
const AreaController = require('../controllers/area.controller')


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
const NEW_PUSH = 0;
const NEW_PULLREQUEST = 1;

/**
 * Call required reaction
 * @group Github - Github UseReaction
 */
exports.UseReaction = async(action_result, area) => {
    //Call required reaction
    await this.createGithubWebhook()
}

/**
 * Interpret webhook trigger post
 * @group Github - Github webhook triggered
 */
exports.webhookTriggered = async(req, res) => {
    //webhook trigger action
    const action_result = {
        "user" : "Ebailloux",
        "repo" : "TESTAREA",
        "webhookId" : "WEBHOOKID",
    }
    AreaController.connectActionToReaction(NEW_PUSH, action_result)
}

/**
 * create github Webhook
 * @group Github - Github createGithubwebhook
 */
exports.createGithubWebhook = async function () {

     var gh = new Github({
        token: TOKEN
    });

    var fork = gh.getRepo('Ebailloux', 'AREATEST');

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

/**
 * Delete github Webhook
 * @group Github - Github DeleteGithubwebhook
 */
exports.deleteGithubWebhook = async function () {
    console.info("delete webhook github");
}

exports.githubPush = async function(area, action_result) {
    //check if hook if is similar to client's hooks
    /*
    if (action_result.webhookId == area.client_id.webhookid)
        return true
    else
        return false*/
        return true;
}
exports.githubNewPullRequest = async function(area, action_result) {
    //check if hook if is similar to client's hooks
      /*
    if (action_result.webhookId == area.client_id.webhookid)
        return true
    else
        return false*/
        return true;
}