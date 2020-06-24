import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    bio,
  },
}) => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{name}</span>
            {bio.length > 20 ? <p>{bio.substring(0, 20)}....</p> : <p>{bio}</p>}
          </div>
          <div className="card-action">
            <Link to={`/profile/${_id}`}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
