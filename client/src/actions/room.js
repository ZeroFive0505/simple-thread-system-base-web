import axios from "axios";
import {
  CREATE_ROOM,
  JOIN_ROOM,
  SEARCH_ROOMS,
  ROOM_ERROR,
  GET_ROOMS,
  CLEAR_CURRENT_ROOM,
} from "./types";
import { setAlert } from "./alert";

// 방 생성하기
export const createRoom = (roomname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/room/", { roomname }, config);
    dispatch({ type: CREATE_ROOM, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "red")));
    }
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};

// 모든 방 목록 가져오기
export const getRooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/room");

    dispatch({ type: GET_ROOMS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};

// 방 들어가기
export const joinRoom = (roomID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/room/join/${roomID}`);
    dispatch({ type: JOIN_ROOM, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};

// 방 검색하기
export const searchRoom = (roomname) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/room/${roomname}`);
    dispatch({ type: SEARCH_ROOMS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};

export const clearCurrentRoom = () => async (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_ROOM });
};
