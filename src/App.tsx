// Renders the app
import * as React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "./components/Routes";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { homePageReducer } from "./reducers/HomePageReducer";

const store = createStore(
  homePageReducer,
  // Thunk allows us to have action creators return functions instead of an action, https://github.com/reduxjs/redux-thunk
  applyMiddleware(thunk)
);

/**
 * @class App
 * @summary Holds the routes and most wrapper components, Base component for the application
 */
class App extends React.PureComponent {
  render() {
    return (
      <HashRouter basename={ENV_CONFIG.ENV.BUCKET_PREFIX}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </HashRouter>
    );
  }
}

export default App;
