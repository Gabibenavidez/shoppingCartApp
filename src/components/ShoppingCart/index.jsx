import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

function ShoppingCart() {
  const { cart, clearCart, purchaseCart, manageCart } = useContext(ProductContext);

  // Calculate total amount based on items in the cart
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to add one unit to a product in the cart
  const handleAddUnit = (product) => {
    manageCart(product, 'add');
  };

  // Function to remove one unit from a product in the cart
  const handleRemoveUnit = (product) => {
    if (product.quantity > 1) {
      manageCart(product, 'remove');
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {/* Render each item in the cart */}
        {cart.map(item => (
          <li key={item.id}>
            {/* Display product name, quantity, price */}
            {item.name} - {item.quantity} x {item.price}
            {/* Button to add one unit */}
            <button onClick={() => handleAddUnit(item)}>+</button>
            {/* Button to remove one unit */}
            <button onClick={() => handleRemoveUnit(item)}>-</button>
          </li>
        ))}
      </ul>
      {/* Display total amount of the cart */}
      <p>Total: {totalAmount}</p>
      {/* Button to clear the entire cart */}
      <button onClick={clearCart}>Clear Cart</button>
      {/* Button to purchase items in the cart */}
      <button onClick={purchaseCart}>Buy Now</button>
    </div>
  );
}

export default ShoppingCart;
