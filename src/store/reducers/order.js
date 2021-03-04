import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_STARTED:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_STARTED:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderID });

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

export default reducer;
