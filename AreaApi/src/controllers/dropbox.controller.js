const dropboxV2Api = require('dropbox-v2-api');
const ServiceAuthController = require('./serviceAuth.controller')
const ServiceModel = require('../models/Service.model')
const DropboxModel = require('../models/Dropbox.model')
const ServiceToken = require('../models/ServiceTokens.model')

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

function notificationWebhooks(req) {
	console.info(req.body)
	// NOTE Add the verification of the USerID
	// TODO Get the token from database
	//DropboxModel.findByClientId()

	// req.body.delta.users.forEach(element => {
	// 	console.info(element)
	// 	const dropbox = dropboxV2Api.authenticate({
	// 		token: 'SVdSs-me6EAAAAAAAAAAFOmZ6DohRTiLLsNOA3AlDDfP9mbGn-dObY657de3MgWZ'
	// 	});
	// 	var cursor;
	// 	dropbox({
	// 		resource: 'files/list_folder',
	// 		parameters: {
	// 			"path": "",
	// 			"recursive": false,
	// 			"include_media_info": false,
	// 			"include_deleted": false,
	// 			"include_has_explicit_shared_members": false,
	// 			"include_mounted_folders": true,
	// 			"include_non_downloadable_files": true
	// 		}
	// 	}, (err, result, response) => {
	// 		if (err) { return console.log(err); }
	// 		cursor = result
	// 		console.info(cursor)
	// 	});
	// });
	// const dropbox = dropboxV2Api.authenticate({
	// 	token: 'SVdSs-me6EAAAAAAAAAAFOmZ6DohRTiLLsNOA3AlDDfP9mbGn-dObY657de3MgWZ'
	// });
	// var cursor;
	// dropbox({
	// 	resource: 'files/list_folder',
	// 	parameters: {
	// 			"path": "",
	// 			"recursive": false,
	// 			"include_media_info": false,
	// 			"include_deleted": false,
	// 			"include_has_explicit_shared_members": false,
	// 			"include_mounted_folders": true,
	// 			"include_non_downloadable_files": true
	// 	}
	// }, (err, result, response) => {
	// 	if (err) { return console.log(err); }
	// 	cursor = result
	// 	console.info(cursor)
	// });
	// dropbox({
	// 	resource: 'files/list_folder/continue',
	// 	// TODO Get the cursor from database
	// 	parameters: {
	// 		"cursor": cursor
	// 	}
	// }, (err, result, response) => {
	// 	if (err) { return console.log(err); }
	// 	// TODO save the new cursor in the database
	// 	console.log(result);
	// });
}
exports.notificationWebhooks = notificationWebhooks;

// TODO MOVE THEM
function dropboxFileAdded(area, action_result) {
	if (action_result.user == area.parameters_action.user)
		return true
	return false
}
exports.dropboxFileAdded = dropboxFileAdded

function dropboxFileDeleted(area, action_result) {
	if (action_result.user == area.parameters_action.user)
		return true
	return false
}
exports.dropboxFileDeleted = dropboxFileDeleted

//NOTE =====================================================================

/**
 * Create specific data for the area (for exemple init a timer for this area)
 */
exports.createArea = async (area) => {
	try {
		// NOTE add the cursor in database

		var serviceId = await ServiceModel.findByName('dropbox')
		if (serviceId == null)
			return
		var UserToken = await ServiceToken.findByServiceAndClientId(serviceId.id, area.client_id)
		const dropbox = dropboxV2Api.authenticate({
			token: UserToken.access_token
		});
		var cursor;
		var userID;
		dropbox({
			resource: 'users/get_current_account',
			parameters: {}
		}, (err, result, response) => {
			if (err) { return console.log(err); }
			console.log(result)
			userID = result.account_id
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
				DropboxModel.create({
					'client_id': area.client_id,
					'dropbox_id': userID,
					'dropbox_cursor': cursor
				})
			});
		})
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
		await DropboxModel.deleteByClientId(area.client_id)
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
 * Init all the necessaries one time for the Service
 */
exports.init = async (app) => {
}
