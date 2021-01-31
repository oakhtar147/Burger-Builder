import React from 'react';

import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const ingredients = [
  'cheese',
  'ketchup',
  'meat',
  'salad'
];

const BuildControls = props => {
  const controls = ingredients
    .map(ingredient => {
    return ( <BuildControl 
      key={ingredient} 
      ingredient={ingredient}
      incrementIngredient={event => props.incrementIngredient(ingredient, event)}
      decrementIngredient={event => props.decrementIngredient(ingredient, event)}
      disabledIngredient={props.disabledIngredients[ingredient]}
    />
    );
  });

  return (
    <div className={styles.BuildControls}>
      <div><strong>${props.totalPrice.toFixed(2)}</strong> for your burger!</div>
      {controls}  
      <button className={styles.OrderButton} 
        onClick={props.proceedToPurchase}
        disabled={!props.purchasable}>Order Now</button>
    </div>
  )
};


export default BuildControls;