import React from 'react';
import classes from './Logo.module.css';
const Logo = () => {
  return (
    <div className={classes.Logo}>
      <a className={classes.LogoContent} href="/">
        FERME
      </a>
    </div>
  )
};

export default Logo;