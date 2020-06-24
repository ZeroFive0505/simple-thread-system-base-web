const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Room = require("../models/Room");

// @route POST api/room
// @desc 방 개설
// @access Private
router.post(
  "/",
  [auth, [check("roomname", "방 제목을 입력해주세요").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomname } = req.body;

    try {
      let room = await Room.findOne({ roomname });

      if (room) {
        return res
          .status(400)
          .json({ errors: [{ msg: "이미 존재하는 방입니다." }] });
      }
      room = new Room({
        roomname,
        totalposts: 0,
      });

      await room.save();

      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 오류");
    }
  }
);

// @route GET api/room
// @desc 모든 방 가져오기
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 오류");
  }
});

// @route GET api/room/:roomname
// @desc 방 목록 검색
// @access Private
router.get("/:roomname", async (req, res) => {
  try {
    let rooms = await Room.find({
      roomname: { $regex: req.params.roomname },
    });

    if (!rooms) {
      return res.status(400).json({ msg: "방이 존재하지 않습니다." });
    }

    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ msg: "방이 존재하지 않습니다." });
    }
    res.status(500).send("서버 에러");
  }
});

// @route GET api/room/join/:roomname
// @desc 방 입장
// @access Private
router.get("/join/:roomID", async (req, res) => {
  try {
    let currentRoom = await Room.findById(req.params.roomID);
    if (!currentRoom) {
      return res.status(400).json({ msg: "방이 존재하지 않습니다." });
    }
    res.json(currentRoom);
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ msg: "방이 존재하지 않습니다." });
    }
    res.status(500).send("서버 에러");
  }
});

module.exports = router;
