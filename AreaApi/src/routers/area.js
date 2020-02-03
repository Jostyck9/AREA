const express = require('express');

const router = express.Router();

router.get('/area', async(req, res) => {
    res.send("get list of all Action/reaction linked by the user");
})

router.post('/area', async(req, res) => {
    console.log("update actions reaction of the user");
})

module.exports = router