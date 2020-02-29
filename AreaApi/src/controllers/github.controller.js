var Github = require('github-api');
var typeGithubEvent = require('typeof-github-event');
var Promise = require("es6-promise").Promise;
const AreaController = require('../controllers/area.controller');
const ServiceAuthController = require('./serviceAuth.controller');
const ApiAuth = require('./auth.controller');
const ServiceModel = require('../models/Service.model');
const GithubModel = require('../models/github.model');
const ServiceToken = require('../models/ServiceTokens.model');

const HOOK_URL = process.env.SERVER_URL + "/github/webhook";
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
exports.webhookTriggered = async(payload) => {
    //webhook trigger action

    var type = typeGithubEvent.typeof(payload);
    const action_result = {
        repository: payload.repository.name
    };
    if (typeGithubEvent.isPush(payload)) {
        AreaController.connectActionToReaction(NEW_PUSH, action_result)
    }
    else if (typeGithubEvent.is('pull_request', payload)) {
        AreaController.connectActionToReaction(NEW_PULLREQUEST, action_result)
    }
}

/**
 * create github Webhook
 * @group Github - Github createGithubwebhook
 */
exports.createGithubWebhook = async function (newArea) {

    var action_webhook_type = "empty";
    if (newArea.action_id === 0)
        action_webhook_type = "push";
    else
        action_webhook_type = "pull_request";
    var serviceId = await ServiceModel.findByName('github')
	if (serviceId == null)
		return
    var UserToken = await ServiceToken.findByServiceAndClientId(serviceId.id, newArea.client_id)
	var gh = new Github({
        token: UserToken.access_token
    });
    var fork = gh.getRepo(newArea.parameters_action.username, newArea.parameters_action.repository);
    if (action_webhook_type == "push") {
        var hookDef = {
            "name": "web",
            "active": true,
            "events": [
              "push",
            ],
            "config": {
            "url": HOOK_URL,
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
            "url": HOOK_URL,
            "content_type": "json",
            "insecure_ssl": "0"
            }
        }
    }
    try {
        fork.createHook(hookDef)
        .then(function({data: hook}) {});
    } catch (error) {
        console.err( {message: error.message || 'An internal error occured' });
    }
    const newGModel = new GithubModel({
        client_id: newArea.client_id,
        username: newArea.parameters_action.username,
        repo_name: newArea.parameters_action.repository,
        webhook_type: action_webhook_type
    });
    await GithubModel.create(newGModel);
}

/**
 * Delete github Webhook
 * @param {GithubModel} githubModel - githubModel linked to the webhook that will be deleted
 * @group Github - Github DeleteGithubwebhook
 */
exports.deleteGithubWebhook = async function (githubModel) {
    var fork = gh.getRepo(githubModel.username, githubModel.repo_name);
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
    if (action_result.repository == githubModel.repo_name)
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
    if (action_result.repository == githubModel.repo_name)
        return true;
    else
        return false;
}

//NOTE ========================================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
    try {
        createGithubWebhook(area);
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Delete the area (specific for each service (for exemple , delete the timer inthe time table))
 *
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
    try {
        this.deleteGithubWebhook();
    } catch (err) {
        console.error(err)
        console.error('Ignoring')
    }
}

/**
 * Call the appropriate reaction from area of the service
 *
 * @param {JSON} actionResult -
 */
exports.useReaction = async (actionResult, area) => {
}

/**
 * Init all the timers of the Service
 *
 * @param {Express} app server express
 */
exports.init = async (app) => {
}