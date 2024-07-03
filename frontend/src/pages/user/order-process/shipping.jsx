import { useContext, useEffect, useState } from "react";
import "./shipping.scss";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { CartContext } from "../../../contexts/cart.context";

const Shipping = () => {
   const navigate = useNavigate();

   const [shippingMethodChoice, setShippingMethodChoice] = useState(0);
   const [shippingMethods, setShippingMethods] = useState([]);

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   //
   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );
   const { userCart, setUserCart } = useContext(CartContext);

   const config = {
      headers: {
         Authorization: `Bearer ${aimsUserInfo.token}`,
         "Content-Type": "application/json",
      },
   };

   useEffect(() => {
      axios.get("/api/shipping-method").then(({ data }) => {
         setShippingMethods(data);
      });
   }, []);

   useEffect(() => {
      let isIneligible = userCart?.products?.some(
         (product) => product.productId > 10
      );
      // setUserCart({
      //    ...userCart,
      //    shippingMethod: 1,
      //    shippingFee: shippingMethods[0]?.shippingFee,
      // });
      if (userCart.addressProvince !== "Hà Nội" || isIneligible) {
         setShippingMethodChoice(1);
         if (shippingMethods.length > 1) {
            setShippingMethods(shippingMethods.splice(0, 1));
         }
      } else {
         setShippingMethodChoice(userCart?.shippingMethod);
      }
   }, [shippingMethods, userCart]);

   useEffect(() => {
      let cart = localStorage.getItem(`cart${aimsUserInfo.id}`);
      cart = JSON.parse(cart);
      if (!cart?.shippingMethod) {
         cart.shippingMethod = 1;
         cart.shippingFee = 25000;
         localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cart));
         setUserCart({ ...userCart, shippingMethod: 1, shippingFee: 25000 });
      }
   }, [aimsUserInfo.id, setUserCart, userCart]);

   return (
      <div className="shipping">
         <Button
            variant="outline-secondary"
            className="mb-4 d-flex align-items-center"
            onClick={() => {
               navigate("/order-process/address");
            }}
         >
            <ArrowLeft className="me-3" />
            Back to Address
         </Button>
         <div className="shipping__method">
            <h5>Shipping Method</h5>
            <div className="shipping__method-body">
               {shippingMethods.map((shippingMethod, index) => (
                  <div
                     key={index}
                     className={`px-4 py-3 d-flex justify-content-between ${
                        shippingMethod?.id === shippingMethodChoice
                           ? "shipping__method-type-active"
                           : "shipping__method-type"
                     } ${
                        shippingMethod?.id === 1
                           ? "shipping__method-first"
                           : shippingMethod?.id === 2
                           ? "shipping__method-last"
                           : ""
                     }`}
                     onClick={() => {
                        setShippingMethodChoice(shippingMethod?.id);
                        let cart = localStorage.getItem(
                           `cart${aimsUserInfo?.id}`
                        );
                        cart = JSON.parse(cart);
                        cart.shippingMethod = shippingMethod?.id;
                        cart.shippingFee = shippingMethod?.shippingFee;
                        setUserCart(cart);
                        localStorage.setItem(
                           `cart${aimsUserInfo?.id}`,
                           JSON.stringify(cart)
                        );
                     }}
                  >
                     <div className="d-flex">
                        <p className="mb-0" style={{ minWidth: "9rem" }}>
                           {shippingMethod.name}
                        </p>
                        <p className="mb-0">
                           {shippingMethod.shippingFee
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                           VNĐ
                        </p>
                     </div>
                     <div>
                        {/* {shippingMethod.estimatedDeliveryDate.toLocaleDateString(
                           "en-GB",
                           {
                              weekday: "long",
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                           }
                        )} */}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="shipping__voucher"></div>
      </div>
   );
};

export default Shipping;
