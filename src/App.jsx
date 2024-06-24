import React from "react";
import { ProductProvider } from "./context/ProductContext";
import AppContainer from "./components/AppContainer";
import { reverseString } from "./utils/reverseString";

function App() {

  console.log("reversed string", reverseString("a,b$cde$%&/fghi"));


  return (
    <ProductProvider>
      <AppContainer />
    </ProductProvider>
  );
}

export default App;
