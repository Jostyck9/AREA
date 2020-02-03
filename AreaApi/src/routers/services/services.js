const express = require('express');
var services = express(); //oula

const router = express.Router();

router.get('/services', async(req, res) => {
    //Get a list of available services
    res.send("ReplaceByServicesList"); //to be replaced
})

module.exports = router