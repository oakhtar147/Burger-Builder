import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.2,
  salad: 0.3,
  ketchup: 0.1,
};

const initState = {
  ingredients: null,
  totalPrice: 4.0,
  error: false,
};

const burgerBuilderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INC_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients[action.key] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.key],
      };

    case actionTypes.DEC_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients[action.key] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.key],
      };

    case actionTypes.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      };

    case actionTypes.GET_INGREDIENTS_FAILED:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default burgerBuilderReducer;
