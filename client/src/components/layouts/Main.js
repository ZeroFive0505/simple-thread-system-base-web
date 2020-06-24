import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Main = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container">
      <div>
        <h1 className="x-large py-3">Cloud Community</h1>
        <div className="container py-3">
          <Link
            to="/register"
            className="waves-effect waves-light btn-large mr-2"
          >
            회원 가입
          </Link>
          <Link to="/login" className="waves-effect waves-light btn-large">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Main);
