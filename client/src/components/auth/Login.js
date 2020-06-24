import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large">로그인</h1>
      <p className="lead">
        <i className="material-icons">verified_user</i> 계정에 로그인하세요.
      </p>
      <form onSubmit={(event) => onSubmit(event)}>
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

          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                type="password"
                className="validate"
                value={password}
                onChange={(event) => onChange(event)}
                minLength="6"
              />
              <label htmlFor="password">비밀번호</label>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="로그인"
          className="waves-effect waves-light btn-large"
        />
      </form>
      <p className="my-1">
        계정이 없으신가요? <Link to="/register">가입하기</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const matStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(matStateToProps, { login })(Login);
