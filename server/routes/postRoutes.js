const express = require('express');
const router = express.Router();
const {
  getPosts,
  getUserPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, createPost);
router.get('/user', protect, getUserPosts);
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
