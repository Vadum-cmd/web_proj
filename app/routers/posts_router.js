const express = require("express");
const Post = require("../models/Post");


const router = express.Router();

router.get("/count", async (req, res) => {
  try {
      const posts = await Post.find()
      res.json(posts.length);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 5;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        createdAt: new Date(),
    });
    try{
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, description, author } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, description, author },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(deletedPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;
