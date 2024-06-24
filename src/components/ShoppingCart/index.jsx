import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faPlus, faMinus, faTrashAlt, faDollar } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../utils/modal";
import { ProductContext } from "../../context/ProductContext";

const ShoppingCartContainer = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  margin: 0px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 90%;

  h2 {
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: ${props => props.theme.text};
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    li {
      flex: 1 1 300px;
      margin: 10px 0;
      padding: 10px;
      border: 1px solid ${props => props.theme.borderColor};
      background-color: ${props => props.theme.background};
      color: ${props => props.theme.text};
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }

      .item-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-top: 10px;
      }
    }

    @media (max-width: 768px) {
      li {
        flex: 1 1 200px;
      }
    }

    @media (max-width: 480px) {
      li {
        flex: 1 1 150px;
      }
    }
  }

  p {
    margin-top: 10px;
    font-weight: bold;
    font-size: 1.3em;
  }

  button[type="button"] {
    background-color: ${props => props.theme.primaryButton};
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${props => props.theme.primaryButtonHover};
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${props => props.theme.disabledColor};
    }
  }

  @media (max-width: 768px) {
    button[type="button"] {
      padding: 10px 15px;
    }
  }

  @media (max-width: 480px) {
    button[type="button"] {
      padding: 10px 10px;
    }
  }
`;

const NotificationBadge = styled.span`
  background-color: red;
  color: white;
  font-size: 0.8em;
  padding: 3px 6px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const ShoppingCartModalButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    font-size: 24px;
    color: ${props => props.theme.text};
  }

  .badge-container {
    position: relative;
  }

  &:hover {
    transform: scale(1.5);
  }

  &:focus {
    outline: none;
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
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.disabledColor};
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: ${props => props.theme.backgroundCard};
  color: ${props => props.theme.text};
  padding: 10px 15px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primaryButton};
    color: ${props => props.theme.inputCart};
  }

  .item-name {
    font-weight: bold;
  }

  .item-quantity {
    margin: 0 10px;
  }

  .item-price {
    display: flex;
    align-items: center;
  }
`;

const ShoppingCart = () => {
  const { cart, clearCart, purchaseCart, manageCart } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddUnit = (product) => {
    manageCart(product, "add");
  };

  const handleRemoveUnit = (product) => {
    manageCart(product, "remove");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isCartEmpty = cart.length === 0;

  return (
    <>
      <ShoppingCartModalButton onClick={openModal} disabled={isCartEmpty} theme={theme}> 
        <div className="badge-container">
          {totalQuantity > 0 && <NotificationBadge>{totalQuantity}</NotificationBadge>}
          <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        </div>
      </ShoppingCartModalButton>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ShoppingCartContainer>
          <h2><FontAwesomeIcon icon={faShoppingCart} className="icon" /> &nbsp;&nbsp;Shopping Cart</h2>
          <ul>
            {cart.map((item) => {
              const isLastItem = item.quantity === 1;
              return (
                <li key={item.id}>
                  <ItemDetails>
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">{item.quantity} x</div>
                    <div className="item-price">
                      <FontAwesomeIcon icon={faDollar} color="green" />
                      &nbsp;{item.price.toFixed(2)}
                    </div>
                  </ItemDetails>
                  <div className="action-buttons">
                    <ActionButton onClick={() => handleAddUnit(item)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </ActionButton>
                    <ActionButton onClick={() => handleRemoveUnit(item)}> 
                      {isLastItem ? <FontAwesomeIcon icon={faTrashAlt} /> : <FontAwesomeIcon icon={faMinus} />}
                    </ActionButton>
                  </div>
                </li>
              );
            })}
          </ul>
          <p>Total Amount: &nbsp; <span className="no-wrap"><FontAwesomeIcon icon={faDollar} color="green" />&nbsp;{totalAmount.toFixed(2)}</span></p>
          <div className="action-buttons">
            <ActionButton onClick={() => {
              clearCart();
              closeModal();
            }} 
            style={{ marginRight: "1em" }}
            disabled={isCartEmpty}>
              Clear Cart
            </ActionButton>
            <ActionButton onClick={() => {
              purchaseCart();
              closeModal();
            }} disabled={isCartEmpty}>
              Buy Now
            </ActionButton>
          </div>
        </ShoppingCartContainer>
      </Modal>
    </>
  );
};

export default ShoppingCart;
