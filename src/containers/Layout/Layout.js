import React, { Component } from "react";
import { connect } from "react-redux";

import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  // setState is async so return a function when
  // using the prev state inside the function
  handleToggleSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          showSideDrawer={this.state.showSideDrawer}
          closeSideDrawer={this.handleToggleSideDrawer}
        />
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          showSideDrawer={this.state.showSideDrawer}
          toggleSideDrawer={this.handleToggleSideDrawer}
        />
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.tokenId !== null,
  };
};

export default connect(mapStateToProps)(Layout);
