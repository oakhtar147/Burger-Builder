import * as actionTypes from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false,
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default ordersReducer;
