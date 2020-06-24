import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      setAlert("두 비밀번호가 일치하지 않습니다!", "red");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large">회원 가입</h1>
      <p className="lead">
        <i className="fas fa-user"></i> 당신의 새로운 계정을 만드세요.
      </p>
      <div className="row">
        <form className="col s12" onSubmit={(event) => onSubmit(event)}>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="name"
                type="text"
                value={name}
                onChange={(event) => onChange(event)}
                className="validate"
              />
              <label htmlFor="first_name">이름</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                type="email"
                className="validate"
                value={email}
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                type="password"
                className="validate"
                value={password}
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="password">비밀번호</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password2"
                type="password"
                className="validate"
                value={password2}
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="password">비밀번호 확인</label>
            </div>
          </div>
          <input
            type="submit"
            value="회원 가입"
            className="waves-effect waves-light btn-large"
          />
        </form>
      </div>
      <p className="my-1">
        이미 계정을 가지고 계신가요? <Link to="/login">로그인 하기</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
