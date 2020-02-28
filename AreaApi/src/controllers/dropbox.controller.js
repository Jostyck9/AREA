const dropboxV2Api = require('dropbox-v2-api');

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