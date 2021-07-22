import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Login";
import SideNav from "../SideNav";
import TopNav from "../TopNav";
import useAuthCheck from "../../hooks/useAuthCheck";
import { lazy } from "react";

const Home = lazy(() => import("../Home"));
const StreamingPage = lazy(() => import("../StreamingPage"));
const UserDetail = lazy(() => import("../UserDetail"));
const Search = lazy(() => import("../Search"));
const ErrorPage = lazy(() => import("../ErrorPage"));

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  useAuthCheck();

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
          <Route path="/search" component={Search} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </>
    )
  );
}

export default App;
