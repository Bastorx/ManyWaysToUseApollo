import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Components from "./containers/Components";
import Compose from "./containers/Compose";
import Hooks from "./containers/Hooks";
import WithApollo from "./containers/WithApollo";

class RouterComponent extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/components">Components Example</Link>
            </li>
            <li>
              <Link to="/compose">Compose Example</Link>
            </li>
            <li>
              <Link to="/hooks">Hooks Example</Link>
            </li>
            <li>
              <Link to="/with-apollo">WithApollo Example</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/components" component={Components} />
          <Route path="/compose" component={Compose} />
          <Route path="/hooks" component={Hooks} />
          <Route path="/with-apollo" component={WithApollo} />
        </Switch>
      </Router>
    );
  }
}

export default RouterComponent;
