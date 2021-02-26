import React, { Component } from "react";

import axios from "../../axiosOrders";
import styles from "./ContactForm.module.css";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class ContactForm extends Component {
  fieldConfig = (elementType, type, placeholder, value) => ({
    elementType,
    elementConfig: { type, placeholder },
    value,
  });

  state = {
    orderForm: {
      name: this.fieldConfig("input", "text", "Your Name"),
      email: this.fieldConfig("input", "email", "Your Email"),
      street: this.fieldConfig("input", "text", "Street No."),
      zip: this.fieldConfig("input", "text", "Zip Code"),
      methodOfPayment: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "mastercard", displayValue: "MasterCard" },
            { value: "easypaisa", displayValue: "EasyPaisa" },
            { value: "jazzcash", displayValue: "JazzCash" },
          ],
        },
        value: "",
      },
    },
    sendingRequest: false,
  };

  changedInputHandler = (event, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    // deep copy, fields refer to the clone's fields and not the original state fields
    const updatedField = { ...updatedOrderForm[identifier] };
    updatedField.value = event.target.value;
    updatedOrderForm[identifier] = updatedField;
    this.setState({
      orderForm: updatedOrderForm,
    });
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ sendingRequest: true });
    const { ingredients, totalPrice } = this.props;
    const order = {
      ingredients,
      totalPrice,
      customerDetails: {
        name: "Osama Akhtar",
        address: "Street 07 Sector 02",
        zip: "46000",
        city: "Rawalpindi",
      },
      paymentMethod: "COD",
    };
    try {
      await axios.post("/orders.json", order);
      this.setState({ sendingRequest: false });
      this.props.history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const formElements = [];
    for (const [key, config] of Object.entries(this.state.orderForm)) {
      const field = { id: key, config };
      formElements.push(field);
    }

    const form = this.state.sendingRequest ? (
      <Spinner />
    ) : (
      <form>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.changedInputHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success" onClick={this.orderHandler}>
          Order Now!
        </Button>
        <Button type="Danger">Cancel Order!</Button>
      </form>
    );

    return (
      <div className={styles.ContactForm}>
        <h2>Your Information</h2>
        {form}
      </div>
    );
  }
}

export default ContactForm;
