const express = require('express');
const router = express.Router();
const log = require('./../logger');
const {apiVersion} = require("../helpers/api-version");

router.get('/', (req, res) => {
    const message = `Health check from api ver: ${apiVersion()}`;
    log.info(message);
    res.send(message);
});

module.exports = router;
