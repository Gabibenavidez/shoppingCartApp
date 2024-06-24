import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: black;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
`;

const MsgModal = ({ messages, onClose }) => {
  if (messages.length === 0) return null;

  return (
    <ModalBackground>
      <ModalContent>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalBackground>
  );
};

MsgModal.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MsgModal;
