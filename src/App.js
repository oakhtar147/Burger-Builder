import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { authCheckState } from "./store/actions/";
import asyncComponent from "./hoc/asyncComponent";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncLogout = asyncComponent(() => {
  return import("./containers/Auth/Logout/Logout");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && (
              <Route path="/orders" component={asyncOrders} />
            )}
            {this.props.isAuthenticated && (
              <Route path="/checkout" component={asyncCheckout} />
            )}
            <Route path="/auth" exact component={asyncAuth} />
            {this.props.isAuthenticated && (
              <Route path="/logout" exact component={asyncLogout} />
            )}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
