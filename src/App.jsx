import React from "react";
import { ProductProvider } from "./context/ProductContext";
import AppContainer from "./components/AppContainer";

function App() {

  return (
    <ProductProvider>
      <AppContainer />
    </ProductProvider>
  );
}

export default App;
