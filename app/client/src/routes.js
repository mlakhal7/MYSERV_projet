import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorPage from "./components/Error/ErrorPage";

import SalesPage from "./components/Account/Menu/Sales";
import ProfilePage from "./components/Account/Menu/Profile";
import CartPage from "./components/Account/Menu/Cart";
import FavsPage from "./components/Account/Menu/Favs";

export default (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/signup" component={RegisterPage} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/sales" component={SalesPage} />
    <PrivateRoute path="/profile" component={ProfilePage} />
    <PrivateRoute path="/cart" component={CartPage} />
    <PrivateRoute path="/favs" component={FavsPage} />

    <Route path="*" component={ErrorPage} />
  </Switch>
);