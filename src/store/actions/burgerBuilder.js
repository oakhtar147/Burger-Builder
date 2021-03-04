import axios from "../../axiosOrders";

import * as actionTypes from "./actionTypes";

export const incrementIngredient = (ingredientName) => {
  return {
    type: actionTypes.INC_INGREDIENT,
    ingredientName,
  };
};

export const decrementIngredient = (ingredientName) => {
  return {
    type: actionTypes.DEC_INGREDIENT,
    ingredientName,
  };
};

const getIngredients = (ingredients) => {
  return {
    type: actionTypes.GET_INGREDIENTS,
    ingredients,
  };
};

const getIngredientsFailed = () => {
  return {
    type: actionTypes.GET_INGREDIENTS_FAILED,
    error: true,
  };
};

export const getIngredientsAsync = () => {
  return (dispatch) => {
    return axios
      .get("/ingredients.json")
      .then((res) => {
        const { data } = res;
        dispatch(getIngredients(data));
      })
      .catch((err) => {
        console.log("foo");
        dispatch(getIngredientsFailed());
      });
  };
};
