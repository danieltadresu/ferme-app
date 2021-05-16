import React, { useEffect, useState } from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import classes from './Header.module.css';
import windowSize from '../../../utils/hooks/useWindowSize';
const Header = () => {
  const [isMobileHeader, setIsMobileHeader] = useState(false);
  const { height, width } = windowSize();

  const mobileHeaderHandler = (value) => {
    setIsMobileHeader(value);
  };

  return (
    <div>
      {isMobileHeader ? (
        <header className={classes.HeaderMobile} />
      ) : (
        <header className={classes.Header}>
          <Logo />
          <Navigation
            size={width}
            mobileNavigationHeader={mobileHeaderHandler}
          />
        </header>
      )}
    </div>

    // <header className={classes.Header}>
    //   {!isMobileHeader && <Logo />}
    //   <Navigation
    //     size={width}
    //     mobileNavigationHeader={mobileHeaderHandler}
    //   />
    // </header>
  )
};

export default Header;