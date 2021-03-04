import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "../ContactForm/ContactForm";

class Checkout extends Component {
  render() {
    const summary = this.props.ingredients ? (
      <>
        {this.props.purchased && <Redirect to="/" />}
        <CheckoutSummary ingredients={this.props.ingredients} />
        <Route
          path={this.props.match.url + "/contact"}
          component={ContactForm}
        />
      </>
    ) : (
      <Redirect to="/" />
    );

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.orders.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
