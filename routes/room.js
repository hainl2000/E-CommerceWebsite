var express = require('express');
var router = express.Router();

const roomController = require('../controllers/room');
const messageController = require('../controllers/message');

router.get('/loadMessages',roomController.loadMessages);
// router.post('/sendMsg',messageController.sendMessage);
router.get('/getRoomList',roomController.getRoomList);
module.exports = router;