import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header/Header';
import OperationsMenu from '../components/Layout/Operations/OperationsMenu/OperationsMenu';
import AddProduct from '../components/Layout/Operations/AddProduct/AddProduct';
import ProductDetail from '../components/Layout/Operations/ProductDetail/ProductDetail';
import 'antd/dist/antd.css';
import useSelection from 'antd/lib/table/hooks/useSelection';
const Operations = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const itemChangeHandler = (value) => {
    console.log('value :>> ', value);
    setSelectedItem(value);
  };

  return (
    <>
      <Header />
      {selectedItem === 0 && <OperationsMenu selectedItem={itemChangeHandler} />}
      {selectedItem === 1 && <AddProduct selectedItem={itemChangeHandler} />}
      {selectedItem === 2 && <ProductDetail />}
    </>
  );
};

export default Operations;