import axios from "../../axiosOrders";

import * as actionTypes from "./actionTypes";

export const incrementIngredient = (key) => {
  return {
    type: actionTypes.INC_INGREDIENT,
    key,
  };
};

export const decrementIngredient = (key) => {
  return {
    type: actionTypes.DEC_INGREDIENT,
    key,
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
