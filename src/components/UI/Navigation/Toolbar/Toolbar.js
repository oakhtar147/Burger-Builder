import React from "react";

import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import styles from "./Toolbar.module.css";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle toggle={props.toggleSideDrawer} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;
