var Github = require('github-api');
var typeGithubEvent = require('typeof-github-event');
var Promise = require("es6-promise").Promise;
const AreaController = require('../area.controller');
const ServiceAuthController = require('../serviceAuth.controller');
const ApiAuth = require('../auth.controller');
const ServiceModel = require('../../models/Service.model');
const AreaModel = require('../../models/Area.model');
const GithubModel = require('../../models/github.model');
const ServiceToken = require('../../models/ServiceTokens.model');

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
 * Check if the action_result matches an area's action parameters
 * @param {area} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Github - Github githubPush
 */
exports.githubPush = async function(area, action_result) {
    //check if hook if is similar to client's hooks

    const githubModel = await GithubModel.getGithubObject(area.client_id);
    if (action_result.repository == githubModel.repo_name && area.action_id == action_result.hook_type)
        return true;
    return false;
}

/**
 * Check if the action_result matches an area's action parameters
 * @param {JSON} area - area concerned
 * @param {JSON} action_result - action result of the concerned area
 * @group Github - Github githubNewPullRequest
 */
exports.githubNewPullRequest = async function(area, action_result) {
    //check if hook if is similar to client's hooks
    const githubModel = await GithubModel.getGithubObject(area.client_id);
    if (action_result.repository == githubModel.repo_name && area.action_id == action_result.hook_type) {
        return true;
    }
    return false;
}

/**
 * Interpret webhook trigger post
 * @param {JSON} payload - data receive after github post request
 * @group Github - Github webhook triggered
 */
exports.webhookTriggered = async(payload) => {
    //webhook trigger action

    var type = typeGithubEvent.typeof(payload);

    if (typeGithubEvent.isPush(payload)) {
        const action_result = {
            repository: payload.repository.name,
            hook_type: "push"
        };
        this.connectActionToReaction(NEW_PUSH, action_result)
    }
    else if (typeGithubEvent.is('pull_request', payload)) {
        const action_result = {
        repository: payload.repository.name,
        hook_type: "pull_request"
    };
        this.connectActionToReaction(NEW_PULLREQUEST, action_result)
    }
}

/**
 * ConnectAction to reaction
 * @group Github - Github connect Action to reaction
 * @param {string} action_id id of the action
 * @param {json} actionResult the result from the action
 */
exports.connectActionToReaction = async function (action_id, action_result) {
    try {
        const AreaArray = await AreaModel.findByActionId(action_id);
        AreaArray.forEach(element => {
            if (this.checkIfuserIsConcerned(element, action_result, action_id)) {
                AreaController.SendToReactionById(element, action_id, action_result);
            }
        });
    }
    catch (error) {
        console.error( {message: error.message || 'An internal error occured' });
    }
}

/**
 * Check if user is concerned by action
 * @group Github - Github checkIfuserIsConcerned
 * @param {JSON} area Area
 * @param {json} actionResult the result from the action
 * @param {string} action_id id of the action
 */
exports.checkIfuserIsConcerned = function (area, action_result, action_id) {
    switch (action_id) {
        case NEW_PUSH:
            if (this.githubPush(area, action_result))
                return true;
        case NEW_PULLREQUEST:
            if (this.githubNewPullRequest(area, action_result))
                return true;
    }
    return false;
}

/**
 * create github Webhook
 * @group Github - Github createGithubwebhook
 * @param {JSON} area Area
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
   try {
       var UserToken = await ServiceToken.findByServiceAndClientId(serviceId.id, newArea.client_id)
	    var gh = new Github({
            token: UserToken.access_token
        });
        var fork = gh.getRepo(newArea.parameters_action.username, newArea.parameters_action.repository);
   } catch (error) {
        console.error( {message: error.message || 'An internal error occured' });
   }
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
        console.error( {message: error.message || 'An internal error occured' });
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
}

/**
 * Create specific data for the area (for exemple init a timer for this area)
 * * @param {JSON} area Area
 */
exports.createArea = async (area) => {
    try {
        await this.createGithubWebhook(area);
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