import { createContext, useState } from "react";

export const CartContext = createContext({
   userCart: {},
   setUserCart: () => null,
});

export const CartProvider = ({ children }) => {
   const [userCart, setUserCart] = useState([]);
   const value = { userCart, setUserCart };

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   );
};