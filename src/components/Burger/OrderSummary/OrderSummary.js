import React, { useEffect } from "react";

import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const orderSummary = Object.keys(props.ingredients).map((ingredient) => (
    <li key={ingredient}>
      <span style={{ textTransform: "capitalize" }}>
        {ingredient}: <strong>{props.ingredients[ingredient]}</strong>
      </span>
    </li>
  ));

  useEffect(() => {
    console.log("[OrderSummary] useEffect");
  }, [props.show]);

  return (
    <>
      <h3>Excellent choice!</h3>
      <p>Here's the summary of your burger</p>
      <ul>{orderSummary}</ul>
      <p>
        Total Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      <p>Proceed to Checkout?</p>
      <Button type="Success" onClick={props.purchase}>
        Checkout
      </Button>
      <Button type="Danger" onClick={props.cancelPurchase}>
        Cancel
      </Button>
    </>
  );
};

export default OrderSummary;
