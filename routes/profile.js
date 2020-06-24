const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// @route GET api/profile/me
// @desc 자기 자신의 프로필 로딩
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("cc-users");

    if (!profile) {
      return res.status(400).json({ msg: "프로파일이 존재하지 않습니다!" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 에러");
  }
});

// @route POST api/profile
// @desc 프로필 생성 또는 변경
// @access Private
router.post("/", auth, async (req, res) => {
  const { hobbies, location, bio } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  hobbies ? (profileFields.hobbies = hobbies) : (profileFields.hobbies = null);
  location
    ? (profileFields.location = location)
    : (profileFields.location = null);
  bio ? (profileFields.bio = bio) : (profileFields.bio = null);

  if (hobbies) {
    profileFields.hobbies = hobbies.split(",").map((hobby) => hobby.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create a profile
    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 에러");
  }
});

// @route GET api/profiles
// @desc 모든 프로필 가져오기
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류");
  }
});

// @route GET api/profile/user/:user_id
// @desc 해당 id의 프로필 가져오기
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user");

    if (!profile) {
      return res.status(400).json({ msg: "프로필이 존재하지 않습니다!" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ msg: "프로필이 존재하지 않습니다!" });
    }
    res.status(500).send("서버 에러");
  }
});

// @route DELETE api/profile
// @desc 프로필 삭제와 모든 흔적 삭제
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });

    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "계정 삭제 완료" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 에러");
  }
});

module.exports = router;
