import React, { Component } from "react";

import axios from "../../axiosOrders";
import styles from "./ContactForm.module.css";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class ContactForm extends Component {
  fieldConfig = (
    elementType,
    type,
    placeholder,
    value,
    fixedLength = null,
    required = true,
    isValid = false
  ) => ({
    elementType,
    elementConfig: { type, placeholder },
    value,
    validation: {
      required,
      minLength: 5,
      maxLength: 40,
      fixedLength,
    },
    isValid,
    touched: false,
  });

  state = {
    orderForm: {
      name: this.fieldConfig("input", "text", "Your Name"),
      email: this.fieldConfig("input", "email", "Your Email"),
      street: this.fieldConfig("input", "text", "Street No."),
      zip: this.fieldConfig("input", "text", "Zip Code", "", 5),
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
        isValid: true,
      },
    },
    sendingRequest: false,
    formIsValid: false,
  };

  checkValidity = (field, rules) => {
    const isNonEmpty = field.trim().length > 0;

    const satisfiesMinLength =
      !rules.fixedLength && field.trim().length >= rules.minLength;

    const satisfiesMaxLength =
      !rules.fixedLength && field.trim().length <= rules.maxLength;

    const isFixedLength = field.trim().length === rules.fixedLength;

    return (
      isNonEmpty &&
      ((satisfiesMinLength && satisfiesMaxLength) || isFixedLength)
    );
  };

  changedInputHandler = (event, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    // deep copy, fields refer to the clone's fields and not the original state fields
    const updatedField = { ...updatedOrderForm[identifier] };
    updatedField.value = event.target.value;

    let formIsValid = false;

    if (updatedField.validation) {
      updatedField.isValid = this.checkValidity(
        updatedField.value,
        updatedField.validation
      );
      updatedField.touched = true;

      for (let field in updatedOrderForm) {
        if (field.isValid) {
          formIsValid = true;
        }
      }
    }

    updatedOrderForm[identifier] = updatedField;
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ sendingRequest: true });
    const { ingredients, totalPrice } = this.props;

    const orderDetails = { ingredients, totalPrice };

    for (let [field, config] of Object.entries(this.state.orderForm)) {
      orderDetails[field] = config.value;
    }

    try {
      await axios.post("/orders.json", orderDetails);
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
      <form onSubmit={this.orderHandler}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.isValid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.changedInputHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          Order Now!
        </Button>
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
