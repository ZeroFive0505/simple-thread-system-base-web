import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { getPostsByID } from "../../actions/post";

export const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  currentRoom,
  getPostsByID,
}) => {
  const forAuthUser = (
    <ul className="right">
      {currentRoom && (
        <li>
          <a href="#!" title="Refresh">
            <i
              className="fas fa-retweet mr-1"
              onClick={(event) => {
                event.preventDefault();
                getPostsByID(currentRoom._id);
              }}
            ></i>
          </a>
        </li>
      )}
      <li>
        <Link to="/profiles" title="사용자 목록">
          <i className="fas fa-users mr-1"></i>
        </Link>
      </li>
      <li>
        <Link to="/dashboard" title="대시보드">
          <i className="fas fa-chalkboard mr-1"></i>
        </Link>
      </li>
      <li>
        <Link to="/search" title="방 검색 및 입장">
          <i className="fas fa-search mr-1"></i>
        </Link>
      </li>
      <li>
        <a href="#!" title="로그아웃" onClick={logout}>
          <i className="fas fa-sign-out-alt mr-1"></i>{" "}
        </a>
      </li>
    </ul>
  );

  const forGuestUser = (
    <ul className="right">
      <li>
        <Link to="/register">가입하기</Link>
      </li>
      <li>
        <Link to="/login">로그인</Link>
      </li>
    </ul>
  );

  return (
    <nav className="green">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          CC
          <i className="material-icons">cloud</i>
        </Link>
        {!loading && (
          <Fragment>{isAuthenticated ? forAuthUser : forGuestUser}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
  getPostsByID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  currentRoom: state.room.currentRoom,
});

export default connect(mapStateToProps, { logout, getPostsByID })(Navbar);
