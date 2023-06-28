const { getMessages, addMessage } = require('../controllers/messageController');
const {auth} = require('../middlewares/auth');
const router = require('express').Router();

router.route('/')
.post(auth, addMessage)

router.route('/:id')
.get(auth, getMessages)

module.exports = router;