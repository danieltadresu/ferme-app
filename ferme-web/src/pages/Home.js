import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header/Header';
import LandingPage from '../components/Layout/LandingPage/LandingPage';
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    console.log('cartQuantity :>> ', cartQuantity);
  }, [cartQuantity]);

  return <React.Fragment>
    <Header
      setModalVisible={setModalVisible}
      cartQuantity={cartQuantity}
    />
    <LandingPage
      modalCartIsVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCartQuantity={setCartQuantity}
    />
  </React.Fragment>;
};

export default Home;