import axios from "axios";
import {
  GET_POSTS,
  CLEAR_POSTS,
  POST_ERROR,
  CREATE_POST,
  GET_POST,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import { setAlert } from "./alert";

// 현재 방 포스트 가져오기
export const getPostsByID = (roomID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${roomID}`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};

// 포스트 하나 가져오기
export const getPost = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/detail/${postID}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 좋아요 추가
export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);

    dispatch({ type: UPDATE_LIKES, payload: { postID, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 포스트 삭제
export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({ type: DELETE_POST, payload: postID });

    dispatch(setAlert("글이 삭제되었습니다.", "red"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 포스트 추가
export const addPost = (text, roomID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/posts/`, { text, roomID }, config);
    dispatch({ type: CREATE_POST, payload: res.data });
    dispatch(setAlert("글이 게시되었습니다.", "green"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 답글 추가
export const addComment = (postID, comment) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postID}`,
      comment,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("답글 작성완료!", "green"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 답글 삭제
export const deleteComment = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);
    dispatch({ type: DELETE_COMMENT, payload: commentID });

    dispatch(setAlert("답글 삭제완료!", "green"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 가져온 포스트 비우기
export const clearPost = () => async (dispatch) => {
  dispatch({ type: CLEAR_POSTS });
};

// 포스트 검색하기
export const searchPost = (roomID, text) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${roomID}/${text}`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.msg, status: error.response.status },
    });
  }
};
