import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Roomlist from "../roomlist/Roomlist";
import {
  searchRoom,
  createRoom,
  getRooms,
  clearCurrentRoom,
} from "../../actions/room";

const Search_home = ({ searchRoom, createRoom, getRooms, room }) => {
  const [roomname, setRoomname] = useState("");

  useEffect(() => {
    clearCurrentRoom();
    getRooms();
  }, []);

  const onChange = (event) => {
    setRoomname(event.target.value);
    searchRoom(event.target.value);
  };

  return (
    <Fragment>
      <div className="row">
        <h3>방을 검색합니다.</h3>
        <form
          className="col s6"
          onSubmit={(event) => {
            event.preventDefault();
            createRoom(roomname);
            setRoomname("");
          }}
        >
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                value={roomname}
                name="roomname"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="icon_prefix">방 제목</label>
            </div>
            <button
              className="waves-effect waves-light btn my-2"
              type="submit"
              value="Submit"
            >
              확인
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <ul className="collection with-header">
          <li className="collection-header">
            <h5>목록</h5>
          </li>
          <Roomlist rooms={room.rooms} />
        </ul>
      </div>
    </Fragment>
  );
};

Search_home.propTypes = {
  searchRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, { searchRoom, createRoom, getRooms })(
  Search_home
);
