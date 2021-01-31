import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NagivationItem/NavigationItem';


const NavigationItems = props => (
  <div className={styles.NavigationItems}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/'>Contact us</NavigationItem>
  </div>
);


export default NavigationItems;