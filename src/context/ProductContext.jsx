import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MsgModal from "../utils/MsgModal";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [darkmode, setdarkmode] = useState(() => JSON.parse(localStorage.getItem("darkmode")) || false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch products from data.json on component mount
    fetch("/data.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        revalidateCart(data.products); // Revalidate cart with fetched products
      })
      .catch(error => {
        hanldleMessage(error.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const revalidateCart = (products) => {
    setCart(prevCart => {
      return prevCart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product && cartItem.quantity > product.amount) {
          hanldleMessage(`Stock for ${cartItem.name} has changed. Adjusting quantity to available stock.`);
          return { ...cartItem, quantity: product.amount };
        }
        return cartItem;
      });
    });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [cart, darkmode]);

  const manageCart = (product, type) => {
    try {
      if (product.amount <= 0) {
        throw new Error(`Product ${product.name} is out of stock and cannot be added to the cart.`);
      }

      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      let updatedCart = [...cart];

      switch (type) {
      case "add":
        if (existingProductIndex !== -1) {
          if (updatedCart[existingProductIndex].quantity < product.amount) {
            updatedCart[existingProductIndex].quantity++;
          } else {
            throw new Error(`Maximum stock limit reached for ${product.name}`);
          }
        } else {
          updatedCart.push({ ...product, quantity: 1 });
        }
        break;

      case "remove":
        if (existingProductIndex !== -1) {
          if (updatedCart[existingProductIndex].quantity > 1) {
            updatedCart[existingProductIndex].quantity--;
          } else {
            updatedCart.splice(existingProductIndex, 1);
          }
        }
        break;

      default:
        throw new Error(`Unsupported action type "${type}"`);
      }

      setCart(updatedCart);
    } catch (error) {
      hanldleMessage(error.message);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (newProduct) => {
    // Check if ID or product name exist
    const isDuplicate = products.some(
      (product) => product.id === newProduct.id || product.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (isDuplicate) {
      hanldleMessage("Error: Product ID or Name already exists.");
      return;
    }

    setProducts([...products, newProduct]);
  };

  const toggledarkmode = () => {
    setdarkmode(prevdarkmode => !prevdarkmode);
  };

  const purchaseCart = () => {
    try {
      let stockSufficient = true;

      const validatedCart = cart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
          if (cartItem.quantity > product.amount) {
            stockSufficient = false;
            return { ...cartItem, quantity: product.amount };
          }
        }
        return cartItem;
      });

      if (!stockSufficient) {
        setCart(validatedCart);
        throw new Error("Stock insufficient for some items. Please review your cart.");
      }

      const updatedProducts = products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, amount: product.amount - cartItem.quantity };
        }
        return product;
      });

      setProducts(updatedProducts);
      setCart([]);
    } catch (error) {
      hanldleMessage(error.message);
    }
  };

  const clearErrors = () => {
    setMessages([]);
  };

  return (
    <ProductContext.Provider value={{
      products,
      cart,
      manageCart,
      clearCart,
      addProduct,
      toggledarkmode,
      darkmode,
      purchaseCart
    }}>
      {children}
      <MsgModal messages={messages} onClose={clearErrors} />
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProductProvider;
