const { getConversations, addConversation } = require('../controllers/conversationController');
const {auth} = require('../middlewares/auth');
const router = require('express').Router();

router.route('/')
    .get(auth, getConversations)
    .post(auth, addConversation);

module.exports = router;