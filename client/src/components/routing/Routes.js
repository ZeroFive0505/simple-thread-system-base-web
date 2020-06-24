import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import ProfileForm from "../profile-form/ProfileForm";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Post from "../post/Post";
import Room from "../room/Room";
import Search from "../search/Search";
import { Route, Switch } from "react-router-dom";
import Alert from "../layouts/Alert";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/room/join/:id" component={Room} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/posts/detail/:id" component={Post} />
      </Switch>
    </div>
  );
};

export default Routes;
