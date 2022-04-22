import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Customer from "./pages/Customer";
import Book from "./pages/Book";
import Download from "./pages/Download";
import Payments from "./pages/Payments";
import Category from "./pages/Category";
import Author from "./pages/Author";
import Settings from "./pages/Setting";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/author" component={Author} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
