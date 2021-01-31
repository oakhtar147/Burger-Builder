import React from 'react';
import PropTypes from 'prop-types';

import styles from './Ingredient.module.css';


const BurgerIngredient = props => {
  const ingredient = props.type;

  const ingredientMappings = {
    'bread-bottom': <div className={styles.BreadBottom}></div>,
    'bread-top': (
      <div className={styles.BreadTop}>
        <div className={styles.Seeds1}></div>
        <div className={styles.Seeds2}></div>
      </div>
    ),
    'meat': <div className={styles.Meat}></div>,
    'cheese': <div className={styles.Cheese}></div>,
    'salad': <div className={styles.Salad}></div>,
    'ketchup': <div className={styles.Ketchup}></div>
  }
  
  return ingredientMappings[ingredient];
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};


export default BurgerIngredient;