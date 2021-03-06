import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

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
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStarted());
    axios
      .post("/orders.json?auth=" + getState().auth.tokenId, orderData)
      .then((response) => dispatch(purchaseBurger(response.data, orderData)))
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};

export const fetchOrdersStarted = () => {
  return {
    type: actionTypes.FETCH_ORDERS_STARTED,
  };
};

export const fetchOrders = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrdersAsync = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersStarted());
    const { tokenId, userId } = getState().auth;
    const queryParams = `?auth=${tokenId}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const orders = [];
        for (let order in res.data) {
          orders.push({ ...res.data[order], id: order });
        }
        dispatch(fetchOrders(orders));
      })
      .catch((error) => dispatch(fetchOrdersFailed(error)));
  };
};
