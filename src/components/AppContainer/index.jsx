import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ProductsList from "../ProductsList";
import ShoppingCart from "../ShoppingCart";
import AddProduct from "../AddProduct";
import DarkmodeToggle from "../DarkModeToggle";
import { ProductContext } from "../../context/ProductContext";
import Modal from "../../utils/modal";

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primaryButton: "#4d4c4c",
  primaryButtonHover: "#cccfff",
  secondaryButton: "#dc3545",
  secondaryButtonHover: "#c82333",
  borderColor: "#ccc",
  disabledColor: "#ccc",
  inputCart: "#ffffff"
};

const darkTheme = {
  background: "#000000",
  backgroundCard: "333333",
  text: "#ffffff",
  primaryButton: "#333333",
  primaryButtonHover: "#ffffff",
  secondaryButton: "#dc3545",
  secondaryButtonHover: "#c82333",
  borderColor: "#666",
  disabledColor: "#333333",
  inputCart: "#ffffff",
};
  
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
  
`;

const AddProductButton = styled.button`
  margin-top: 10px;
`;


const AppHeader = styled.h1`
  margin-top: 25px;
  margin-bottom: 0px;
`;

const AppContainer = () => {
  const { darkmode } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const openModal = () => {
    setIsModalOpen(true);
    navigate("/add-product");
  };


  return (
    <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
      <HomeWrapper>
        <ShoppingCart />
        <AppHeader>Store</AppHeader>
        <DarkmodeToggle />
        <AddProductButton onClick={openModal}>Add New Product</AddProductButton>
        <ProductsList />
      </HomeWrapper>
      <Routes>
        <Route path="/add-product" element={
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddProduct closeModal={closeModal} />
          </Modal>}
        />
      </Routes>
    </ThemeProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <AppContainer />
  </Router>
);

export default AppWrapper;
