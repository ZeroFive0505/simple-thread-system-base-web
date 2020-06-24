import {
  CREATE_ROOM,
  JOIN_ROOM,
  ROOM_ERROR,
  GET_ROOMS,
  SEARCH_ROOMS,
  CLEAR_CURRENT_ROOM,
} from "../actions/types";

const initialState = {
  rooms: [],
  currentRoom: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: payload,
        loading: false,
      };
    case CREATE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, payload],
        loading: false,
      };
    case SEARCH_ROOMS:
      return {
        ...state,
        rooms: payload,
      };
    case ROOM_ERROR:
      return {
        ...state,
        error: payload,
      };
    case JOIN_ROOM:
      return {
        ...state,
        currentRoom: payload,
        loading: false,
      };
    case CLEAR_CURRENT_ROOM:
      return {
        ...state,
        loading: true,
        currentRoom: null,
      };
    default:
      return state;
  }
}
