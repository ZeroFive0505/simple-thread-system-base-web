import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearPost } from "../../actions/post";
import { clearCurrentRoom } from "../../actions/room";

const Roomlist = ({ rooms, clearPost, clearCurrentRoom }) => {
  useEffect(() => {
    clearCurrentRoom();
    clearPost();
  }, [clearPost]);
  return rooms.map((room) => (
    <li className="collection-item" key={room._id}>
      <div>
        {room.roomname}
        <Link to={`/room/join/${room._id}`} className="secondary-content">
          <i className="material-icons">meeting_room</i>
        </Link>
      </div>
    </li>
  ));
};

Roomlist.propTypes = {
  rooms: PropTypes.array.isRequired,
  clearPost: PropTypes.func.isRequired,
  clearCurrentRoom: PropTypes.func.isRequired,
};

export default connect(null, { clearPost, clearCurrentRoom })(Roomlist);
