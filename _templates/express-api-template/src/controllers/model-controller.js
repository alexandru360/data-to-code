const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const log = require('./../logger');

router.get('/findAll', (req, res) => {
    const {ModelFindService} = require("../services/service-model");
    ModelFindService(null, null, log).then(r => {
        res.send(JSON.stringify(r));
    }).catch(e => {
        log.error(e);
        res.send(JSON.stringify(e));
    });
});

router.get('/findBy/:id', (req, res) => {
    const {ModelFindByIdService} = require("../services/service-model");
    ModelFindByIdService(req.params.id, null, null, log).then(r => {
        res.send(JSON.stringify(r));
    }).catch(e => {
        log.error(e);
        res.send(JSON.stringify(e));
    });
});

router.post('/', (req, res) => {
    const {ModelUpsertService} = require("../services/service-model");
    ModelUpsertService(req.body, null, null, log).then(r => {
        res.send(JSON.stringify(r));
    }).catch(e => {
        log.error(e);
        res.send(JSON.stringify(e));
    });
});

router.put('/', (req, res) => {
    const {ModelUpsertService} = require("../services/service-model");
    ModelUpsertService(req.body, null, null, log).then(r => {
        res.send(JSON.stringify(r));
    }).catch(e => {
        log.error(e);
        res.send(JSON.stringify(e));
    });
});

router.delete('/deleteById/:id', (req, res) => {
    const {ModelDeleteByIdService} = require("../services/service-model");
    ModelDeleteByIdService(req.params.id, null, null, log).then(r => {
        res.send(JSON.stringify(r));
    }).catch(e => {
        log.error(e);
        res.send(JSON.stringify(e));
    });
});

module.exports = router;
