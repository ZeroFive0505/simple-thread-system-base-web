import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentUserProfile } from "../../actions/profile";

const initialState = {
  location: "",
  hobbies: "",
  bio: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentUserProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentUserProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      if (Array.isArray(profileData.hobbies))
        profileData.hobbies = profileData.hobbies.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentUserProfile, profile]);

  const { location, hobbies, bio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-black">프로필 수정</h1>
      <p className="lead">
        <i className="fas fa-user" /> 당신의 프로필을 수정합니다.
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="지역"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">사는 곳 (예: 서울, 부산..)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="취미"
            name="hobbies"
            value={hobbies}
            onChange={onChange}
          />
          <small className="form-text">
            쉼표로 분류해주세요. (예: A,B,C....)
          </small>
        </div>
        <div className="form-group">
          <textarea placeholder="" name="bio" value={bio} onChange={onChange} />
          <small className="form-text">당신에 대해 예기해주세요.</small>
        </div>
        <input
          type="submit"
          className="waves-effect waves-light btn green darken-1 m-2"
          value="확인"
        />
        <Link
          className="waves-effect waves-light btn green darken-1 m-2"
          to="/dashboard"
        >
          돌아가기
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentUserProfile,
})(ProfileForm);
