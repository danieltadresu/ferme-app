import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


const ProductList = (props) => {

  const fetchProducts = (filterValue) => {
    console.log('filterValue :>> ', filterValue);
  };

  useEffect(() => {
    fetchProducts(props.selectedItem);
  }, [props.selectedItem])

  return <React.Fragment>
    <h1>Product List!</h1>
    <h1>{props.selectedItem}</h1>
  </React.Fragment>;
};

ProductList.propTypes = {
  selectedItem: PropTypes.number,
};

ProductList.defaultProps = {
  selectedItem: 1,
};

export default ProductList;