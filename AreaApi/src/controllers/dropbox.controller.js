const dropboxV2Api = require('dropbox-v2-api');
const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')


/**
 * dropobox connect the token received to the database
 * 
 * @param {any} req the request
 * @param {any} res the res
 */
exports.dropbox = async (req, res) => {
    try {
        const resService = await ServiceModel.findByName('dropbox')
        if (!resService)
            throw new Error("Unkown service dropbox")

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
        req.session.destroy()
    } catch (err) {
        res.status(400).send({ message: err.message || 'An internal error occured' });
    }
}


function initDropbox(params) {
	// NOTE add the cursor in database
	const dropbox = dropboxV2Api.authenticate({
		token: 'SVdSs-me6EAAAAAAAAAAFOmZ6DohRTiLLsNOA3AlDDfP9mbGn-dObY657de3MgWZ'
	});
	var cursor;
	dropbox({
		resource: 'files/list_folder',
		parameters: {
				"path": "",
				"recursive": false,
				"include_media_info": false,
				"include_deleted": false,
				"include_has_explicit_shared_members": false,
				"include_mounted_folders": true,
				"include_non_downloadable_files": true
		}
	}, (err, result, response) => {
		if (err) { return console.log(err); }
		cursor = result.cursor
		console.info(cursor)
	});
}

function notificationWebhooks(req) {
	console.info(req.body)
	// NOTE Add the verification of the USerID
	// TODO Get the token from database
	const dropbox = dropboxV2Api.authenticate({
		token: 'SVdSs-me6EAAAAAAAAAAFOmZ6DohRTiLLsNOA3AlDDfP9mbGn-dObY657de3MgWZ'
	});
	var cursor;
	dropbox({
		resource: 'files/list_folder',
		parameters: {
				"path": "",
				"recursive": false,
				"include_media_info": false,
				"include_deleted": false,
				"include_has_explicit_shared_members": false,
				"include_mounted_folders": true,
				"include_non_downloadable_files": true
		}
	}, (err, result, response) => {
		if (err) { return console.log(err); }
		cursor = result.cursor
		console.info(cursor)
	});
	dropbox({
		resource: 'files/list_folder/continue',
		// TODO Get the cursor from database
		parameters: {
			"cursor": cursor
		}
	}, (err, result, response) => {
		if (err) { return console.log(err); }
		// TODO save the new cursor in the database
		console.log(result);
	});
}
exports.notificationWebhooks = notificationWebhooks;

function dropboxFileAdded(area, action_result) {
	if (action_result.user == area.parameters_action.user)
		return true
	return false
}

function dropboxFileDeleted(area, action_result) {
	if (action_result.user == area.parameters_action.user)
		return true
	return false
}
