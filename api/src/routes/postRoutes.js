const { createPost, getPost, updatePost, deletePost, getAllPosts, getFollowingsPosts, addComment, updateComment, deleteComment, likeComment, likePost, savePost } = require('../controllers/postController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();


router.post('/new', auth, createPost);
router.route('/post/:id')
.get(getPost)
.put(auth, updatePost)
.delete(auth, deletePost);
router.put('/post/:id/like', auth, likePost)
router.put('/post/:id/save', auth, savePost)

router.get('/', getAllPosts);
router.get('/followings', auth, getFollowingsPosts);

module.exports = router;