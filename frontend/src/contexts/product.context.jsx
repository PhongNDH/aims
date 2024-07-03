import { createContext, useState } from "react";

export const ProductContext = createContext({
   allProducts: {},
   setAllProducts: () => null,
});

export const ProductProvider = ({ children }) => {
   const [allProducts, setAllProducts] = useState([]);
   const value = { allProducts, setAllProducts };

   return (
      <ProductContext.Provider value={value}>
         {children}
      </ProductContext.Provider>
   );
};
