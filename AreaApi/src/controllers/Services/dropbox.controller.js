const dropboxV2Api = require('dropbox-v2-api');
const ServiceAuthController = require('../serviceAuth.controller')
const ServiceModel = require('../../models/Service.model')
const DropboxModel = require('../../models/Dropbox.model')
const ServiceToken = require('../../models/ServiceTokens.model')
const AreaModel = require('../../models/Area.model')
const AreaController = require('../area.controller')

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

/**
* Manage the notification from dropbox
*
* @param {any} req the request
*/
exports.notificationWebhook = async function notificationWebhook(req) {

	try {
		for (const element in req.body.list_folder.accounts) {
			const dropboxAccounts = await DropboxModel.findByAccountId(req.body.list_folder.accounts[element])
			const ResService = await ServiceModel.findByName('dropbox')
			if (dropboxAccounts == null || ResService == null)
				return
			for (const userElement in dropboxAccounts) {
				const UserToken = await ServiceToken.findByServiceAndClientId(ResService.id, dropboxAccounts[userElement].client_id)
				if (UserToken == null)
					return
				const dropbox = dropboxV2Api.authenticate({
					token: UserToken.access_token
				})
				let newCursor = null
				dropbox({
					resource: 'files/list_folder/continue',
					parameters: {
						"cursor": dropboxAccounts[userElement].dropbox_cursor
					}
				}, (err, result, response) => {
					if (err) { return console.log(err); }
					if (result.entries.length == 1) {
						const action_result = {
							name: result.entries[0].name,
							user: dropboxAccounts[userElement].client_id
						}
						switch (result.entries[0]['.tag']) {
							case 'deleted':
								this.connectActionToReaction(10, action_result)
								break;
							case 'file':
								this.connectActionToReaction(9, action_result)
								break;
							default:
								break;
						}
					}
					newCursor = result.cursor;
					DropboxModel.updateCursor(newCursor, dropboxAccounts[userElement].client_id)
				});
			}
		}
	} catch (err) {
		console.log(err)
	}
}

/**
* Create the area with Dropbox and add cursor in database
*
* @param {json} area the current area in creation
*/
exports.createArea = async (area) => {
	try {
		if (await DropboxModel.findByClientId(area.client_id) != null)
			return
		// NOTE add the cursor in database
		var serviceId = await ServiceModel.findByName('dropbox')
		if (serviceId == null)
			return
		var UserToken = await ServiceToken.findByServiceAndClientId(serviceId.id, area.client_id)
		if (UserToken == null)
			return
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
 * Delete the area (specific for each service (for exemple , delete the dropbox in the time table))
 * 
 * @param {JSON} - area
 */
exports.deleteArea = async (area) => {
	try {
		const AreaArray = await AreaModel.findByActionId(area.action_id);
		for (const element in AreaArray) {
			if (AreaArray[element].client_id == area.client_id) {
				return
			}
		}
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

/**
 * ConnectAction to reaction
 * @group Dropbox - Dropbox connect Action to reaction
 * @param {string} action_id id of the action
 * @param {json} actionResult the result from the action
 */
exports.connectActionToReaction = async function connectActionToReaction(action_id, action_result) {
	try {
        const AreaArray = await AreaModel.findByActionId(action_id);
		if (AreaArray == null)
			return
		AreaArray.forEach(element => {
			if (this.checkIfUserIsConcerned(element, action_result)) {
				AreaController.SendToReactionById(element, action_id, action_result);
			}
        });

    }
    catch (error) {
		console.error(error)
	}
}

/**
 * Check if user is concerned by action
 * @group Dropbox - Dropbox checkIfuserIsConcerned
 * @param {JSON} area Area
 * @param {json} actionResult the result from the action
 * @param {string} action_id id of the action
 */
exports.checkIfUserIsConcerned = async function checkIfUserIsConcerned(area, action_result) {
	if (area.client_id == action_result.user) {
		return true
	}
	return false
}