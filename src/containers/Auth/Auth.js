import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";
import { authAsync, setAuthRedirectPath } from "../../store/actions/";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirect !== "/") {
      this.props.setAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.authAsync(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  authModeHandler = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement, idx) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    const error = this.props.error && (
      <p>{this.props.error.message.replace("_", " ")}</p>
    );

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
        <h1>{this.state.isSignUp ? " Sign Up" : "Sign In"}</h1>
        {error}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button type="Success">Submit</Button>
        </form>
        <Button type="Danger" onClick={this.authModeHandler}>
          {this.state.isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.tokenId !== null,
    error: state.auth.error,
    loading: state.auth.loading,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authAsync: (email, password, isSignUp) =>
      dispatch(authAsync(email, password, isSignUp)),
    setAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
