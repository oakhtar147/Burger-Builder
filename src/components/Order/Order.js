import React from "react";

import styles from "./Order.module.css";

const Order = (props) => {
  // console.log(props.ingredients);

  const ingredients = [];

  for (let [ingredient, quantity] of Object.entries(props.ingredients)) {
    ingredients.push({ name: ingredient, quantity });
  }

  const ingredientDetails = ingredients.map((ig) => (
    <span key={ig.name} className={styles.details}>
      {ig.name} <strong>({ig.quantity})</strong>
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientDetails}</p>
      <p>
        Price: <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
