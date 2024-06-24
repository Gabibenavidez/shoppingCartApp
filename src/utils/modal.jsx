import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => (props.isOpen ? fadeIn : fadeOut)} 0.3s ease;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${props => props.theme.background};
  padding: 5px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  animation: ${props => (props.isOpen ? fadeIn : fadeOut)} 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 95%;
    max-height: 95%;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 100%;
    max-height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${props => props.theme.primaryButton};
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primaryButtonHover};
  }

  &:focus {
    outline: none;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FontAwesomeIcon icon={faClose}/></CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
