const { addComment, updateComment, deleteComment, likeComment, getPostComments } = require('../controllers/commentController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/')
.post(auth, addComment);

router.route('/:id')
    .get(getPostComments)
    .put(auth, updateComment)
    .delete(auth, deleteComment);

router.put('/:id/like', auth, likeComment)

module.exports = router;