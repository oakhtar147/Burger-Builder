import React from 'react';

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';


const Layout = props => {
  return (
    <>
      <Toolbar />
      <main className={styles.content}>
        <BurgerBuilder />
      </main>
    </>
  );
}


export default Layout;