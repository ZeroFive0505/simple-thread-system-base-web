import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Preloader from "../layouts/Preloader";
import { getCurrentUserProfile, deleteAccount } from "../../actions/profile";
import { clearCurrentRoom } from "../../actions/room";

const Dashboard = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
  clearCurrentRoom,
}) => {
  useEffect(() => {
    getCurrentUserProfile();
    clearCurrentRoom();
  }, [getCurrentUserProfile]);

  return loading && profile === null ? (
    <Preloader />
  ) : (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p>
                <i className="far fa-user-circle"> </i>
                환영합니다! {user && user.name}
              </p>
            </div>

            {profile !== null ? (
              <div className="card-action">
                <Link to="/edit-profile">
                  <i className="fas fa-user-circle"></i>계정 수정
                </Link>
              </div>
            ) : (
              <div className="card-action">
                <p className="white-text">
                  아직 프로필을 생성하지 않았습니다. 당신에 대해 알려주세요.
                </p>
                <Link to="/create-profile" className="orange-text darken-2">
                  프로필 생성
                </Link>
              </div>
            )}
            <button
              className="waves-effect waves-light red btn ml-1 mb-1"
              onClick={() => deleteAccount()}
            >
              계정 삭제
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentUserProfile,
  deleteAccount,
  clearCurrentRoom,
})(Dashboard);
