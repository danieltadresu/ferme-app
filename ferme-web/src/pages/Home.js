import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header/Header';
import LandingPage from '../components/Layout/LandingPage/LandingPage';
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('modalVisible from Home.js :>> ', modalVisible);
  }, [modalVisible]);

  return <React.Fragment>
    <Header
      setModalVisible={setModalVisible}
    />
    <LandingPage
      modalCartIsVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  </React.Fragment>;
};

export default Home;