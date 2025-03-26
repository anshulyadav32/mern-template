const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get user posts
// @route   GET /api/posts/user
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add title and content fields');
  }

  const post = await Post.create({
    user: req.user._id,
    title,
    content,
    image,
  });

  res.status(201).json(post);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check user ownership
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check user ownership
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();
  res.json({ message: 'Post removed' });
});

module.exports = {
  getPosts,
  getUserPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
