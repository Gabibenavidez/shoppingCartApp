import React, { useState, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

function AddProduct() {
  const { products, addProduct } = useContext(ProductContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      name,
      price: parseFloat(price),
      amount: parseInt(amount),
      id: products.length + 1
    };
    addProduct(newProduct);
    setName('');
    setPrice('');
    setAmount('');
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
}

export default AddProduct;
