import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "../ContactForm/ContactForm";

class Checkout extends Component {
  state = {
    ingredients: { cheese: 1 },
    totalPrice: 0,
  };

  render() {
    const summary = this.props.ingredients ? (
      <>
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
  };
};

export default connect(mapStateToProps)(Checkout);
