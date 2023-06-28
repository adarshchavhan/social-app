const { signup, login, logout, getMyProfile, updateMyProfile, deleteMyProfile, updatePassword, followUser, getAllUser, getUser, getSuggestedUsers } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', auth, logout);
router.route('/me')
    .get(auth, getMyProfile)
    .put(auth, updateMyProfile)
    .delete(auth, deleteMyProfile);

router.put('/me/password', auth, updatePassword);
router.put('/follow/:handle', auth, followUser);
router.get('/suggested', auth, getSuggestedUsers);
router.get('/find', auth, getAllUser);
router.get('/find/:handle', auth, getUser);

module.exports = router;