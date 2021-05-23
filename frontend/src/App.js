import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Views
const Login = React.lazy(() => import("./views/viewsUsers/login/Login"));
const VisitorSearch = React.lazy(() =>
  import("./views/viewsUsers/login/VisitorSearch")
);
const RestorePassword = React.lazy(() =>
  import("./views/viewsUsers/login/RestorePassword")
);
const VisitorCalendar = React.lazy(() =>
  import("./views/viewsUsers/calendar/VisitorCalendar")
);

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/visitorSearch"
              name="Visitor Search"
              render={(props) => <VisitorSearch {...props} />}
            />
            <Route
              exact
              path="/visitorCalendar"
              name="Visitor Calendar"
              render={(props) => <VisitorCalendar {...props} />}
            />
            <Route
              exact
              path="/restorePassword"
              name="Restore Password"
              render={(props) => <RestorePassword {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
