import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../../context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const DarkmodeToggleContainer = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.primaryButton};
  }
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
  }
`;

const DarkmodeToggle = () => {
  const { darkmode, toggledarkmode } = useContext(ProductContext);

  return (
    <DarkmodeToggleContainer darkmode={darkmode} onClick={toggledarkmode}>
      {darkmode ? (
        <FontAwesomeIcon icon={faSun} style={{ fontSize: "1em" }} />
      ) : (
        <FontAwesomeIcon icon={faMoon} style={{ fontSize: "1em", width: "1em" }} />
      )}
      <span></span>
    </DarkmodeToggleContainer>
  );
};

export default DarkmodeToggle;
