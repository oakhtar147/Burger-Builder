import React from 'react';

import Ingredient from './Ingredient/Ingredient';
import styles from './Burger.module.css';

const Burger = props => {
  // loop through the ingredients object from the state
  const ingredients = Object.keys(props.ingredients)
    .map(ingredient => {
      const ingredientQuantity = props.ingredients[ingredient];
      // return an array with length === quantity
      // each element is a JSX element of that ingredient
      return [...Array(ingredientQuantity)]
        .map((_, index) => <Ingredient key={`${ingredient}_${index}`} type={ingredient} /> );
      })
    .reduce((acc, next) => [...acc, ...next], []);
    
  return (
    <div className={styles.Burger}>
      <Ingredient type='bread-top' />
      { ingredients.length ? ingredients : <p>Start stacking your burger!</p> }
      <Ingredient type='bread-bottom' />
    </div>
  );
};


export default Burger;