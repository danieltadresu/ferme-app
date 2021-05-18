import React from 'react';
import LogoFerme from '../../../assets/undraw_empty_cart_co35.svg';
import classes from './LandingPage.module.css';
const App = () => {
  return (
    <div className={classes.container}>
      <section className={classes.box}>
        <img src={LogoFerme} className={classes.logo} />
        <h1 className={classes.title}>Ferme Store</h1>
      </section>
      <section className={classes.box}>
        <h1>Categorías</h1>
      </section>

      {/* <h1>Ofertas</h1>
      <h1>Categorias</h1>
      <h1>Consulta por Despacho</h1>
      <h1>Contato</h1>
      <h1>Footer</h1> */}
    </div>
  );
}

export default App;
