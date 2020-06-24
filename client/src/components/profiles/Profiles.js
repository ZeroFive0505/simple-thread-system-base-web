import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Preloader from "../layouts/Preloader";
import ProfileItem from "./ProfileItem";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import { clearCurrentRoom } from "../../actions/room";

const Profiles = ({
  getAllProfiles,
  profile: { profiles, loading },
  clearCurrentRoom,
}) => {
  useEffect(() => {
    getAllProfiles();
    clearCurrentRoom();
  }, [getAllProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Preloader />
      ) : (
        <Fragment>
          <h1>
            프로필 목록{" "}
            <span>
              <i className="fas fa-users"></i>
            </span>
          </h1>

          <div className="divider"></div>
          <div className="section">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>프로필을 찾을 수가 없습니다...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearCurrentRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles, clearCurrentRoom })(
  Profiles
);
