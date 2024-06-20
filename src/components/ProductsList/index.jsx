import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

function ProductList() {
  const { products, manageCart } = useContext(ProductContext);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Available: {product.amount}</p>
          <button onClick={() => manageCart(product, 'add')}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
