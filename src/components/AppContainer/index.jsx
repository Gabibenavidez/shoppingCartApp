import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import DarkModeToggle from '../DarkModeToggle';
import ProductsList from '../ProductsList';
import ShoppingCart from '../ShoppingCart';
import AddProduct from '../AddProduct';
import '../../styles/main.scss';

const AppContainer = () => {
  const { darkMode } = useContext(ProductContext);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>Store</h1>
      <DarkModeToggle />
      <ProductsList />
      <ShoppingCart />
      <AddProduct />
    </div>
  );
};

export default AppContainer;
