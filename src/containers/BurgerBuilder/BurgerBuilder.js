import React, { Component } from "react";

import axios from "../../axiosOrders";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";

const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.2,
  salad: 0.3,
  ketchup: 0.1,
};

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    ingredients: {
      cheese: 1,
      ketchup: 1,
      meat: 1,
      salad: 1,
    },
    totalPrice: 4.1,
    proceedToPurchase: false,
    sendingRequest: false,
    error: false,
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("/ingredients.json");
      this.setState({ ingredients: data });
    } catch (error) {
      this.setState({ error });
    }
  }

  handlePurchase = () => {
    this.setState({ proceedToPurchase: true });
  };

  handleCancelPurchase = () => {
    this.setState({ proceedToPurchase: false });
  };

  handleCheckout = async () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }

    queryParams.push(`price=${this.state.totalPrice}`);
    const ingredients = queryParams.join(" ");

    this.props.history.push({
      pathname: "/checkout",
      search: `?ingredients=${ingredients}`,
    });
  };

  handleIncrementIngredient = (key) => {
    const ingredients = { ...this.state.ingredients };
    // increment the value only of the ingredient concerned
    const updatedIngredients = { ...ingredients, [key]: ++ingredients[key] };
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[key];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  handleDecrementIngredient = (key) => {
    if (this.state.ingredients[key] > 0) {
      const ingredients = { ...this.state.ingredients };
      const updatedIngredients = { ...ingredients, [key]: --ingredients[key] };
      const updatedPrice = Math.abs(
        this.state.totalPrice - INGREDIENT_PRICES[key]
      );

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
      });
    }
  };

  render() {
    const disabledIngredients = { ...this.state.ingredients };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    let orderSummary,
      burgerAndControls = <Spinner />;

    if (this.state.ingredients) {
      burgerAndControls = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            incrementIngredient={this.handleIncrementIngredient}
            decrementIngredient={this.handleDecrementIngredient}
            disabledIngredients={disabledIngredients}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.totalPrice > 4.0}
            proceedToPurchase={this.handlePurchase}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          show={this.state.proceedToPurchase}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchase={this.handleCheckout}
          cancelPurchase={this.handleCancelPurchase}
        />
      );
    }

    return (
      <div className={styles.BurgerBuilder}>
        <Modal
          show={this.state.proceedToPurchase}
          closeModal={this.handleCancelPurchase}
        >
          {this.state.sendingRequest ? <Spinner /> : orderSummary}
        </Modal>
        {this.state.error ? (
          <p>{this.state.error.message}</p>
        ) : (
          burgerAndControls
        )}
      </div>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
