const notificationController = require('../controller/notificationController')
const express = require('express');
const router = express.Router();

router.get('/get', notificationController.getAll)
router.post('/create', notificationController.createN)


module.exports = router