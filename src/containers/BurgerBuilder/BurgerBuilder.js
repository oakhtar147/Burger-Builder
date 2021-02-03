import React, { Component } from 'react';

import axios from '../../axiosOrders';
import styles from './BurgerBuilder.module.css';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';


const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.2,
  salad: 0.3,
  ketchup: 0.1
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      ketchup: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
    totalPrice: 4.0,
    proceedToPurchase: false,
    sendingRequest: false,
  }
  
  handlePurchase = () => {
    this.setState({ proceedToPurchase: true });
  }

  handleCancelPurchase = () => {
    this.setState({ proceedToPurchase: false });
  }

  handleCheckout = async () => {
    this.setState({ sendingRequest: true });
    const {ingredients, totalPrice} = this.state;
    const order = {
      ingredients,
      totalPrice,
      customerDetails: {
        name: 'Osama Akhtar',
        address: 'Street 07 Sector 02',
        zip: '46000',
        city: 'Rawalpindi'
      },
      paymentMethod: 'COD'
    }

    try {
      const request = await axios.post('/orders', order);
      console.log(request);
      this.setState({ sendingRequest: false,  proceedToPurchase: false });
    } catch (err) {
      console.log(err);
    }
    // } finally {
    //   // in any case the request is sent.
    //   // also close the modal
    // }
  }

  handleIncrementIngredient = (key) => {
    const ingredients = {...this.state.ingredients};
    // increment the value only of the ingredient concerned 
    const updatedIngredients = {...ingredients, [key]: ++ingredients[key]};
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
    
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
  }
  
  handleDecrementIngredient = (key) => {
    if (this.state.ingredients[key] > 0) { 
      const ingredients = {...this.state.ingredients};
      const updatedIngredients = {...ingredients, [key]: --ingredients[key]};
      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
      
      this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    }
  }
  
  render() {
    const disabledIngredients = {...this.state.ingredients};
    for (let key in disabledIngredients) {
      disabledIngredients[key] = (disabledIngredients[key] <= 0);
    }

    const orderSummary = <OrderSummary 
      show={this.state.proceedToPurchase}
      ingredients={this.state.ingredients} 
      price={this.state.totalPrice}  
      purchase={this.handleCheckout}
      cancelPurchase={this.handleCancelPurchase}
      />
    
    return (
      <div className={styles.BurgerBuilder}>
        <Modal
          show={this.state.proceedToPurchase} 
          cancelPurchase={this.handleCancelPurchase}>
          {this.state.sendingRequest ? <Spinner /> : orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          incrementIngredient={this.handleIncrementIngredient}
          decrementIngredient={this.handleDecrementIngredient} 
          disabledIngredients={disabledIngredients}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.totalPrice > 4.0}
          proceedToPurchase={this.handlePurchase}
          />
      </div>
    );
  }
};


export default WithErrorHandler(BurgerBuilder, axios);