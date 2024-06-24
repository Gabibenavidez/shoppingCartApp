import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashAlt, faDollar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ProductContext } from "../../context/ProductContext";

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  .product-image {
    width: 150px;
    height: 150px;
    margin-bottom: 5px;
    overflow: hidden;
    border-radius: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .product-details h2 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .product-details p {
    font-size: 0.9rem;
    margin-bottom: 3px;
  }

  .action-buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.primaryButton};
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: scale(1.5);
    color: ${props => props.theme.primaryButtonHover};
  }
  &:focus {
    border-color: ${props => props.theme.primaryButtonHover};
    outline: none;
  }
  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.disabledColor};
  }
`;

const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: -40px;
  margin-top: 0px;
  align-items: center;
`;


const ProductList = () => {
  const { products, manageCart, cart } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

  const handleAddUnit = (product) => {
    manageCart(product, "add");
  };

  const handleRemoveUnit = (product) => {
    if (product.amount > 1) {
      manageCart(product, "remove");
    }
  };

  return (
    <ProductListContainer theme={theme}>
      {products.map((product) => {
        const cartItem = cart.find(item => item.id === product.id);
        const isLastItem = cartItem && cartItem.quantity === 1;
        const isItemInCart = cartItem !== undefined;
        return (
          <ProductItem key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p><strong><FontAwesomeIcon icon={faDollar} color="green"/> {product.price.toFixed(2)}</strong></p>
              <p><strong>Stock :</strong> {product.amount}</p>
              {cartItem ? 
                <ProductQuantity>
                  <FontAwesomeIcon icon={faShoppingCart} className="icon" /> <p><strong>{cartItem.quantity}</strong></p>
                </ProductQuantity> : null}
            </div>
            <div className="action-buttons">
              <ActionButton onClick={() => handleAddUnit(product)}>
                <FontAwesomeIcon icon={faPlus} />
              </ActionButton>
              <ActionButton onClick={() => handleRemoveUnit(product)} disabled={!isItemInCart}> 
                {isLastItem ? <FontAwesomeIcon icon={faTrashAlt} /> : <FontAwesomeIcon icon={faMinus} />}
              </ActionButton>
            </div>
          </ProductItem>
        );
      })}
    </ProductListContainer>
  );
};

export default ProductList;
