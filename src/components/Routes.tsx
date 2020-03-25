// Renders the view based on the route
import * as React from "react";
import { Switch, Route } from "react-router-dom";

/* use react lazy to lazy load the routes. the bundle associated with the route will be loaded only when it is needed 
   this helps to reduce the bundle download time on initial load 
 */
const HomePageConnector = React.lazy(() =>
  import(
    /* webpackChunkName: "bundle.homepage" */ "./../connectors/HomePageConnector"
  )
);

/**
 * @class Routes
 * @summary Renders the view based on the route that has been selected
 */
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <Switch>
        {this.renderRoutes()}
        <Route render={this.notFoundPage} />
      </Switch>
    );
  }
  /**
   * @method
   * @private
   * @summary Renders the mpu page
   */
  private renderRoutes() {
    return (
      <React.Fragment>
        <Route exact path="/" render={this.homePage} />
        <Route path="/home-page" render={this.homePage} />
      </React.Fragment>
    );
  }

  /**
   * @method
   * @private
   * @summary Renders the page not found page
   */
  private notFoundPage() {
    return <div className="page-not-found">404: Page not found</div>;
  }

  private homePage() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <HomePageConnector />
      </React.Suspense>
    );
  }
}

export default Routes;
