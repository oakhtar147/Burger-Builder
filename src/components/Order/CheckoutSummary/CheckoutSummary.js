import React from "react";
import { withRouter } from "react-router-dom";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you like your burger!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        type="Success"
        onClick={() => props.history.push(props.match.url + "/contact")}
      >
        Checkout...
      </Button>
      <Button type="Danger" onClick={() => props.history.goBack()}>
        Cancel!
      </Button>
    </div>
  );
};

export default withRouter(CheckoutSummary);
