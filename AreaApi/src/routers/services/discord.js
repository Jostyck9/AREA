const express = require('express');

const router = express.Router();

router.get('/discord/actions', async(req, res) => {
    //Get a list of discord available actions
    res.send("ReplaceByDiscordActions"); //to be replaced
})

router.get('/discord/reactions', async(req, res) => {
    //Get a list of discord available reactions
    res.send("ReplaceByDiscordReactions"); //to be replaced
})

router.post('/discord/login', async(req, res) => {
    // User logged in Discord
    //get his infos related to discord auth (id, token ....)
    console.log("user logged on discord");
})

router.get('/discord/logout', async(req, res) => {
    //user logged out of Discord
    // ??
    res.send("UserLoggedOutOfDiscord");
})

module.exports = router