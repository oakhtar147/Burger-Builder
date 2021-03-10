import React from "react";

import styles from "./SideDrawer.module.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Backdrop/Backdrop";

const SideDrawer = (props) => {
  const sideDrawerClasses = [
    styles.SideDrawer,
    props.showSideDrawer ? styles.Open : styles.Close,
  ].join(" ");

  return (
    <>
      <Backdrop show={props.showSideDrawer} close={props.closeSideDrawer} />
      <div className={sideDrawerClasses} onClick={props.closeSideDrawer}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
