import React from 'react';

import styles from './BuildControl.module.css';


const BuildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Ingredient}>{props.ingredient}</div>
      <button 
        className={styles.Less}
        onClick={props.decrementIngredient}
        disabled={props.disabledIngredient}>Less</button>
      <button 
        className={styles.More} 
        onClick={props.incrementIngredient}>More</button>
    </div>
  );
};


export default BuildControl;