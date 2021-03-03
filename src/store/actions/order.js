import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";

const purchaseBurgerStarted = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_STARTED,
  };
};

const purchaseBurger = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderId,
    orderData,
  };
};

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerAsync = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStarted());
    axios
      .post("/orders.json", orderData)
      .then((response) => dispatch(purchaseBurger(response.data, orderData)))
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};
