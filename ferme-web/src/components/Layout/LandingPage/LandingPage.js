import React from 'react';
import LogoFerme from '../../../assets/undraw_empty_cart_co35.svg';
import classes from './LandingPage.module.css';
const App = () => {
  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <h1>Filter Categories</h1>
      </section>
      <section className={classes.box}>
        <h1>All products</h1>
      </section>
    </div>
  );
}

export default App;
