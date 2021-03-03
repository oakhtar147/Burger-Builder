import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axiosOrders";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import {
  incrementIngredient,
  decrementIngredient,
  getIngredientsAsync,
} from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    proceedToPurchase: false,
  };

  componentDidMount() {
    this.props.getIngredients();
  }

  handlePurchase = () => {
    this.setState({ proceedToPurchase: true });
  };

  handleCancelPurchase = () => {
    this.setState({ proceedToPurchase: false });
  };

  handleCheckout = async () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledIngredients = { ...this.props.ingredients };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    let orderSummary = null;
    let burgerAndControls = this.props.error ? (
      <p>Ingredients can not be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burgerAndControls = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            incrementIngredient={this.props.handleIncrementIngredient}
            decrementIngredient={this.props.handleDecrementIngredient}
            disabledIngredients={disabledIngredients}
            totalPrice={this.props.totalPrice}
            purchasable={this.props.totalPrice >= 4.0}
            proceedToPurchase={this.handlePurchase}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          show={this.state.proceedToPurchase}
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
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
          {orderSummary}
        </Modal>
        {burgerAndControls}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrementIngredient: (key) => dispatch(incrementIngredient(key)),
    handleDecrementIngredient: (key) => dispatch(decrementIngredient(key)),
    getIngredients: () => dispatch(getIngredientsAsync()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
