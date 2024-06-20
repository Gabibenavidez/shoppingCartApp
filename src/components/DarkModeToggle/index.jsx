import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext'

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ProductContext);
  console.log(darkMode)

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
