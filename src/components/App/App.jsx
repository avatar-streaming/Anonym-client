import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Login from "../Login";
import StreamingPage from "../StreamingPage";
import UserDetail from "../UserDetail";
import ErrorPage from "../ErrorPage";
import TopNav from "../TopNav";
import SideNav from "../SideNav";

import useAuthCheck from "../../hooks/useAuthCheck";
import "../../styles/styles.scss";

function App() {
  const { isAuthenticated } = useSelector(state => state.authReducer);
  useAuthCheck(isAuthenticated);

  return (
    !isAuthenticated ? (
      <Route path="/auth/login" component={Login} />
    ) : (
      <>
        <TopNav />
        <SideNav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/streaming/:id" component={StreamingPage} />
          <Route path="/user/:id" component={UserDetail} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    )
  );
}

export default App;
