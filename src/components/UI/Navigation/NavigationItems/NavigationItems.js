import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NagivationItem/NavigationItem";

const NavigationItems = (props) => (
  <div className={styles.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
  </div>
);

export default NavigationItems;
