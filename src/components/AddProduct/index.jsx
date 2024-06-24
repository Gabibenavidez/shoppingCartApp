import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ProductContext } from "../../context/ProductContext";

const AddProductContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0;
    font-size: 1.5em;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
  }

  button {
    background-color: ${props => props.theme.primaryButton};
    color: #ffffff;
    border: none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${props => props.theme.primaryButtonHover};
    }
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 10px;
    margin: 10px;
  }
`;

const AddProduct = ({closeModal}) => {
  const { products, addProduct } = useContext(ProductContext);

  const initialFormValue ={
    name: "",
    price: "",
    amount: "",
    image: ""
  };
  const [productForm, setProductForm] = useState(initialFormValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...productForm,
      price: parseFloat(productForm.price),
      amount: parseInt(productForm.amount),
      id: products.length + 1
    };
    addProduct(newProduct);
    closeModal();
    setProductForm(initialFormValue);
  };

  return (
    <AddProductContainer>
      <h2>Add New Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={productForm.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={productForm.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={productForm.amount}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={productForm.image}
        onChange={handleInputChange}
      />
      <button onClick={handleAddProduct}>Add</button>
    </AddProductContainer>
  );
};

export default AddProduct;
