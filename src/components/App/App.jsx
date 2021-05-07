import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../styles/styles.scss";

import Home from "../Home";
import Login from "../Login";
import StreamingPage from "../StreamingPage";
import UserDetail from "../UserDetail";
import ErrorPage from "../ErrorPage";
import TopNav from "../TopNav";

function App() {
  return (
    <>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/streaming/:id" component={StreamingPage} />
        <Route path="/user/:id" component={UserDetail} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
