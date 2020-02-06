// Get arguments passed on command line
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
var Service = require('../models/Service')
var Action = require('../models/Action')
var Reaction = require('../models/Reaction')
var mongoose = require('mongoose');

var services = []
var actions = []
var reactions = []

module.exports = {
    populateDB: function populateDB(mongoDB) {
    console.log('this scipt populate the services and the actions');
    mongoose.connect(
        mongoDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    async.series([
        createServices,
        createActions,
        createReactions
    ],
        // Optional callback
        function (err, results) {
            if (err) {
                console.log('FINAL ERR: ' + err);
            }
            else {
                console.log('Services, actions and reactions created');
            }
            // All done, disconnect from database
            mongoose.connection.close();
        });
}
};

function serviceCreate(serviceName, cb) {
    serviceDetail = {
        name: serviceName
    }
    var service = new Service(serviceDetail);

    service.save(function (err) {
        if (err) {
            return;
        }
        console.log('New service: ' + service);
        services.push(service);
        cb(null, service);
    })
}

function actionCreate(actionService, actionName, actionDescription, actionRes, cb) {
    actionDetail = {
        service: actionService,
        name: actionName,
        description: actionDescription,
        res: actionRes
    }

    var action = new Action(actionDetail);

    console.log('here')
    action.save(function (err) {
        if (err) {
            console.log('err: ' + err);
            return;
        }
        console.log('New action: ' + action);
        actions.push(action);
        cb(null, action);
    })
}

function reactionCreate(reactionService, reactionName, reactionDescription, reactionParam, cb) {
    reactionDetail = {
        service: reactionService,
        name: reactionName,
        description: reactionDescription,
        parameters: reactionParam
    }

    var reaction = new Reaction(reactionDetail);

    reaction.save(function (err) {
        if (err) {
            return;
        }
        console.log('New reaction: ' + reaction);
        reactions.push(reaction);
        cb(null, reaction);
    })
}

function createServices(cb) {
    async.parallel([
        function (callback) {
            serviceCreate('GitHub', callback);
        },
        function (callback) {
            serviceCreate('Twitter', callback);
        },
        function (callback) {
            serviceCreate('Spotify', callback);
        },
        function (callback) {
            serviceCreate('Outlook', callback);
        },
        function (callback) {
            serviceCreate('Discord', callback);
        },
        function (callback) {
            serviceCreate('Trello', callback);
        },
        function (callback) {
            serviceCreate('OneDrive', callback);
        },
    ],
        // optional callback
        cb);
}

function createActions(cb) {
    async.parallel([
        function (callback) {
            actionCreate(services[0], 'Push', 'A new push is intended by someone', {name: 'test'}, callback);
        },
        function (callback) {
            actionCreate(services[0], 'Pull request', 'A new pull request is intended by someone', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[1], 'Tweet', 'A new tweet has been post', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[2], 'Music add', 'A new music has been had to a playlist', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[3], 'Email received', 'A new email has been received', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[3], 'Event created', 'A new event has been created in calendar', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[4], 'Message received', 'A new message has been received', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[5], 'Card added', 'A new card has been had to a board', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[5], 'Deadline soon', 'A card approched a deadline', {name: 'string'}, callback);
        },
        function (callback) {
            actionCreate(services[6], 'File added', 'A new file has been add', {name: 'test'}, callback);
        },
        function (callback) {
            actionCreate(services[6], 'File deleted', 'A file has been delete', {name: 'test'}, callback);
        }
    ],
        // optional callback
        cb);
}

function createReactions(cb) {
    async.parallel([
        function (callback) {
            reactionCreate(services[1], 'Tweet', 'Post a new tweet', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[2], 'Add music', 'Add a new music to an existing playlist', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[3], 'Send email', 'Send an email', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[3], 'Create event', 'Create a new event in calendar', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[4], 'Send message', 'Send a message to a specific channel', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[5], 'Add card', 'Add a new card to an existing board', {name: 'string'}, callback);
        },
        function (callback) {
            reactionCreate(services[6], 'Add file', 'Add a new file', {name: 'test'}, callback);
        },
        function (callback) {
            reactionCreate(services[6], 'Delete file', 'Delete a file', {name: 'test'}, callback);
        }
    ],
        // optional callback
        cb);
}



