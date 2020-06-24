import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByID } from "../../actions/profile";

const Profile = ({ profile: { profile, loading }, match, getProfileByID }) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <h4>아직 이 유저는 상세 정보를 등록하지 않았습니다.</h4>
      ) : (
        <Fragment>
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>
                {profile.user.name} 가입일: {profile.date.substring(0, 10)}
              </h4>
            </li>
            <li className="collection-item">이름: {profile.user.name}</li>
            <li className="collection-item">위치: {profile.location}</li>
            {profile.hobbies.map((hobby, index) => (
              <div key={index}>
                <li className="collection-item">취미: {hobby}</li>
              </div>
            ))}
            <li className="collection-item">자기소개: {profile.bio}</li>
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
