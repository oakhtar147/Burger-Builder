import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.2,
  salad: 0.3,
  ketchup: 0.1,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INC_INGREDIENT:
      return incrementIngredient(state, action);
    case actionTypes.DEC_INGREDIENT:
      return decrementIngredient(state, action);
    case actionTypes.GET_INGREDIENTS:
      return getIngredients(state, action);
    case actionTypes.GET_INGREDIENTS_FAILED:
      return getIngredientsFailed(state, action);
    default:
      return state;
  }
};

const incrementIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const decrementIngredient = (state, action) => {
  const deletedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, deletedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const getIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const getIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

export default reducer;
