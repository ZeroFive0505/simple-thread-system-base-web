const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// @route POST api/posts
// @desc 글 작성
// @access Private
router.post(
  "/",
  [auth, [check("text", "내용을 적어주세요.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        room: req.body.roomID,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("서버 오류.");
    }
  }
);

// @route GET api/posts/detail
// @desc 포스트 가져오기
// @access Private
router.get("/detail/:postID", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postID);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

// @route GET api/posts/:id
// @desc 방 아이디로 포스트 가져오기
// @access Private
router.get("/:roomID", async (req, res) => {
  try {
    const posts = await Post.find({ room: req.params.roomID }).sort({
      updatedAt: -1,
    });
    if (!posts) {
      return res.status(404).json({ msg: "작성한 글이 없습니다." });
    }
    res.json(posts);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ msg: "잘못된 아이디 입니다." });
    }
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

// @route GET api/posts/:id/:text
// @desc 글 검색
// @access Private
router.get("/:roomID/:text", async (req, res) => {
  try {
    const posts = await Post.find({
      text: { $regex: req.params.text },
      room: req.params.roomID,
    }).sort({ updatedAt: -1 });

    if (!posts) {
      return res.status(404).json({ msg: "작성된 글이 없습니다." });
    }

    res.json(posts);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ msg: "잘못된 아이디 입니다." });
    }
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

// @route DELETE api/posts/:id
// @desc 글 지우기
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "존재하지 않는 글입니다." });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "권한이 없습니다." });
    }

    await post.remove();

    res.json({ msg: "글 제거완료." });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ msg: "존재하지 않는 아이디입니다." });
    }
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

// @route PUT api/posts/like/:id
// @desc 글 좋아하기
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.json(post.likes);
    } else {
      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

// @route POST api/posts/comment/:id
// @desc 답글 달기
// @access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "내용을 입력해주세요.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      post.updatedAt = Date.now();

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("서버 오류.");
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desce 답글 지우기
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "존재하지 않습니다." });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "인증되지 않은 유저입니다." });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류.");
  }
});

module.exports = router;
