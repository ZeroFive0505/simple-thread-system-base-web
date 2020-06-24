const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
  },
  totalposts: {
    type: Number,
    default: 0,
  },
  updatedat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Room = mongoose.model("room", RoomSchema);
