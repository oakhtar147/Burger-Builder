import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "../ContactForm/ContactForm";

class Checkout extends Component {
  state = {
    ingredients: { cheese: 1 },
    totalPrice: 0,
  };

  componentWillMount() {
    const { search } = this.props.location;
    const query = new URLSearchParams(search).get("ingredients").split(" ");

    let totalPrice;

    const ingredients = query.reduce((acc, next, index) => {
      const [ingredient, quantity] = query[index].split("=");
      if (ingredient === "price") {
        totalPrice = quantity;
      } else {
        acc[ingredient] = +quantity;
      }
      return acc;
    }, {});

    this.setState({ ingredients, totalPrice });
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
        <Route
          path={this.props.match.url + "/contact"}
          render={() => (
            <ContactForm
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
