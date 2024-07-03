import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/home/home";
import Product from "../pages/user/product/product";
import OrderProcess from "../pages/user/order-process/order-process";
import Cart from "../pages/user/order-process/cart";
import Shipping from "../pages/user/order-process/shipping";
import Payment from "../pages/user/order-process/payment";
import Address from "../pages/user/order-process/address";
import AddressForm from "../pages/user/address-form/address-form";
import PaymentForm from "../pages/user/payment-form/payment-form";
import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/cart.context";
import { useSelector } from "react-redux";
import Order from "../pages/user/order/order";
import TransactionInfo from "../pages/user/transaction-info/transaction-info";
import Transaction from "../pages/user/transaction-info/transaction";
import TransactionSuccess from "../pages/user/transaction-info/transaction-success";
import TransactionError from "../pages/user/transaction-info/transaction-error";

const UserRoutes = () => {
   const { aimsUserInfo } = useSelector((state) => state.userLogin);
   const { setUserCart } = useContext(CartContext);

   useEffect(() => {
      let cart = localStorage.getItem(`cart${aimsUserInfo?.id}`);
      cart = JSON.parse(cart);
      setUserCart(cart);
   }, [aimsUserInfo?.id, setUserCart]);
   return (
      <div className="user-routes">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/order-process" element={<OrderProcess />}>
               <Route path="cart" element={<Cart />} />
               <Route path="address" element={<Address />} />
               <Route path="shipping" element={<Shipping />} />
               <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="/transaction" element={<Transaction />}>
               <Route path="" element={<TransactionInfo />} />
               <Route path="success" element={<TransactionSuccess />} />
               <Route path="fail" element={<TransactionError />} />
            </Route>
            <Route path="/address-form" element={<AddressForm />} />
            <Route path="/address-form/:id" element={<AddressForm />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment padding />} />
            <Route path="/order" element={<Order />} />
            <Route
               path="/api/v1/payment/vn-pay-callback"
               element={<TransactionInfo />}
            />
            {/* <Route path="/payment-form" element={<PaymentForm />} /> */}
         </Routes>
      </div>
   );
};

export default UserRoutes;
