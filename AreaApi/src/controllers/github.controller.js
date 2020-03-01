var Github = require('github-api');
var Promise = require("es6-promise").Promise;
const AreaController = require('../controllers/area.controller')
const ServiceAuthController = require('./serviceAuth.controller')
const ApiAuth = require('./auth.controller')
const ServiceModel = require('../models/Service.model')

/**
 * github connect the token received to the database but also connect or register a user to the api
 * 
 * @param {any} req the request
 * @param {any} res the res
 */
exports.github = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('github')
        if (!resService)
            throw new Error("Unkown service github")
        if (req.userArea) {
            ServiceAuthController.connect(
                req.userArea.id,
                {
                    access_token: req.user.accessToken || null,
                    refresh_token: req.user.refresh_token || null,
                    secret_token: req.user.tokenSecret || null,
                    expires_in: null,
                },
                resService.id,
                req.urlCallback.url,
                res
            )
        } else {
            await ApiAuth.loginRegisterOAuth2(
                {
                    username: req.user.profile.username,
                    idLog: req.user.profile.id
                },
                {
                    access_token: req.user.accessToken || null,
                    refresh_token: req.user.refresh_token || null,
                    secret_token: req.user.tokenSecret || null,
                    expires_in: null,
                },
                resService.id,
                req.urlCallback.url,
                res
            )
        }
        req.session.destroy()
    } catch (err) {
        req.session.destroy()
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
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