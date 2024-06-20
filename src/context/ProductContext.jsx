import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);

  useEffect(() => {
    // Fetch products from data.json on component mount
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        revalidateCart(data.products); // Revalidate cart with fetched products
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const revalidateCart = (products) => {
    setCart(prevCart => {
      return prevCart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product && cartItem.quantity > product.amount) {
          console.log(`Stock for ${cartItem.name} has changed. Adjusting quantity to available stock.`);
          return { ...cartItem, quantity: product.amount };
        }
        return cartItem;
      });
    });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [cart, darkMode]);

  const manageCart = (product, type) => {
    // Check if the product has a positive amount available
    if (product.amount <= 0) {
      console.log(`Product ${product.name} is out of stock and cannot be added to the cart.`);
      return;
    }
  
    // Find the existing product in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    // Create a copy of the cart to work with
    let updatedCart = [...cart];
  
    switch (type) {
      case 'add':
        if (existingProductIndex !== -1) {
          if (updatedCart[existingProductIndex].quantity < product.amount) {
            updatedCart[existingProductIndex].quantity++;
          } else {
            console.log(`Maximum stock limit reached for ${product.name}`);
          }
        } else {
          updatedCart.push({ ...product, quantity: 1 });
        }
        break;
  
      case 'remove':
        if (existingProductIndex !== -1) {
          if (updatedCart[existingProductIndex].quantity > 1) {
            updatedCart[existingProductIndex].quantity--;
          } else {
            updatedCart.splice(existingProductIndex, 1);
          }
        }
        break;
  
      default:
        console.log(`Unsupported action type "${type}"`);
        return;
    }
  
    // Update the cart state with the modified copy
    setCart(updatedCart);
  };
  

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const purchaseCart = () => {
    let stockSufficient = true;
    console.log(stockSufficient)
  
    // Revalidate stock before purchase
    const validatedCart = cart.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) {
        if (cartItem.quantity > product.amount) {
          console.log(`Insufficient stock for ${cartItem.name}. Adjusting quantity to available stock.`);
          stockSufficient = false;
          return { ...cartItem, quantity: product.amount };
        }
      }
      return cartItem;
    });
  
    if (!stockSufficient) {
      // Update the cart with the adjusted quantities
      setCart(validatedCart);
      console.log('Stock insufficient for some items. Please review your cart.');
      return;
    }
  
    // Perform the purchase after revalidation
    const updatedProducts = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, amount: product.amount - cartItem.quantity };
      }
      return product;
    });
  
    setProducts(updatedProducts);
    console.log('Purchase successful');
    setCart([]);
  };
  

  return (
    <ProductContext.Provider value={{
      products,
      cart,
      manageCart,
      clearCart,
      addProduct,
      toggleDarkMode,
      darkMode,
      purchaseCart
    }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProductProvider;
