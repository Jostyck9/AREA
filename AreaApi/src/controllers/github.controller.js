var Github = require('github-api');
var Promise = require("es6-promise").Promise;
const AreaController = require('../controllers/area.controller')
const ServiceAuthController = require('./serviceAuth.controller')
const ApiAuth = require('./auth.controller')
const ServiceModel = require('../models/Service.model')
const GithubModel = require('../models/github.model')

const TOKEN = process.env.GITHUB_TOKEN;
const HOOK_URL = process.env.GITHUB_HOOK_URL;
const NEW_PUSH = 0;
const NEW_PULLREQUEST = 1;

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

/**
 * Call required reaction
 * @group Github - Github UseReaction
 */
exports.UseReaction = async(action_result, area) => {
}

/**
 * Interpret webhook trigger post
 * @group Github - Github webhook triggered
 */
exports.webhookTriggered = async(req, res) => {
    //webhook trigger action

    //pour savoir si c'ets un push ou pull --> checker l'id ?
    const action_result = {
        "user" : "Ebailloux",
        "repo" : "TESTAREA",
        "webhook_id" : req.id,
    }
    AreaController.connectActionToReaction(NEW_PUSH, action_result)
}

/**
 * create github Webhook
 * @group Github - Github createGithubwebhook
 */
exports.createGithubWebhook = async function (newArea) {

    if (newArea.action_id === 0)
        var webhook_type = "push";
    else
        var webhook_type = "pull_request";
    var serviceId = await ServiceModel.findByName('github')
	if (serviceId == null)
		return
	//var UserToken = await ServiceToken.findByServiceAndClientId(serviceId.id, newArea.client_id)
	var gh = new Github({
        token: TOKEN
    });

    var fork = gh.getRepo(newArea.parameters_action.username, newArea.parameters_action.repo_name);

    if (webhook_type == "push") {
        var hookDef = {
            "name": "web",
            "active": true,
            "events": [
              "push",
            ],
            "config": {
            "url": "https://b138bac2.ngrok.io/github/webhook",
            "content_type": "json",
            "insecure_ssl": "0"
            }
        }
    } else {
        var hookDef = {
            "name": "web",
            "active": true,
            "events": [
              "pull_request"
            ],
            "config": {
            "url": "https://b138bac2.ngrok.io/github/webhook",
            "content_type": "json",
            "insecure_ssl": "0"
            }
        }
    }
    try {
    fork.createHook(hookDef)
    .then(function({data: hook}) {
       // var webhook_id = hook.id ?
    });
    } catch (error) {
        console.err( {message: err.message || "We were unable to create a github Webhook"});
    }
    var webhook_id = 0;
    const gModel = new GithubModel({
        client_id: newArea.client_id,
        username: newArea.parameters_action.username,
        repo_name: newArea.parameters_action.repo_name,
        webhook_id: webhook_id,
        webhook_type: webhook_type
    });
}

/**
 * Delete github Webhook
 * @param {GithubModel} githubModel - githubModel linked to the webhook that will be deleted
 * @group Github - Github DeleteGithubwebhook
 */
exports.deleteGithubWebhook = async function (githubModel) {
    var fork = gh.getRepo(githubModel.username, githubModel.repo_name);
    //  fork.deleteHook(githubModel.webhook_id)
    console.info("delete webhook github");
}

/**
 * Check if the action_result matches an area's action parameters
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Github - Github githubPush
 */
exports.githubPush = async function(area, action_result) {
    //check if hook if is similar to client's hooks

    const githubModel = await GithubModel.getGithubObject(area.client_id);
    if (action_result.webhook_id == githubModel.webhook_id)
        return true;
    else
        return false;
}

/**
 * Check if the action_result matches an area's action parameters
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Github - Github githubNewPullRequest
 */
exports.githubNewPullRequest = async function(area, action_result) {
    //check if hook if is similar to client's hooks
    const githubModel = await GithubModel.getGithubObject(area.client_id);
    if (action_result.webhook_id == githubModel.webhook_id)
        return true;
    else
        return false;
}