import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  const classes = [styles.InputElement];

  if (props.shouldValidate && props.invalid && props.touched) {
    classes.push(styles.Invalid);
  }

  const inputs = {
    input: (
      <input
        className={classes.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    ),
    textarea: (
      <textarea
        className={classes.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    ),
    select: (
      <select
        className={classes.join(" ")}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options &&
          props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
      </select>
    ),
  };

  return (
    <div className={styles.Input}>
      <label>{props.label}</label>
      {inputs[props.elementType]}
    </div>
  );
};

export default Input;
