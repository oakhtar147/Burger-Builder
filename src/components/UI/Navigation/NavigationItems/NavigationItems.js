import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NagivationItem/NavigationItem";

const NavigationItems = ({ isAuthenticated }) => (
  <div className={styles.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
    {isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </div>
);

export default NavigationItems;
