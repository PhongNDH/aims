import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import "./address.scss";

import { Button } from "react-bootstrap";
import { PlusCircle, ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { CartContext } from "../../../contexts/cart.context";

const Address = () => {
   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);
   const { userCart, setUserCart } = useContext(CartContext);

   const navigate = useNavigate();

   const location = useLocation();
   const [addresses, setAddresses] = useState([]);
   const [shippingMethods, setShippingMethods] = useState([]);

   const [choice, setChoice] = useState(0);
   const [isInOrderProcess, setIsInOrderProcess] = useState(false);

   const getDeliveryInfos = useCallback(() => {
      axios
         .get("/api/delivery-info/user/" + aimsUserInfo?.id, config)
         .then(({ data }) => {
            console.log(data);
            setAddresses(data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [aimsUserInfo?.id, config]);

   useEffect(() => {
      if (location.pathname.includes("/order-process")) {
         setIsInOrderProcess(true);
      }
   }, [location]);

   useEffect(() => {
      window.scrollTo(0, 0);
   },[]);

   useEffect(() => {
      let cart = localStorage.getItem(`cart${aimsUserInfo?.id}`);
      if(!userCart?.address && cart?.address){
         cart = JSON.parse(cart);
         cart.address = addresses[0]?.id;
         cart.addressProvince = addresses[0]?.province;
         setUserCart(cart);
         localStorage.setItem(
            `cart${aimsUserInfo?.id}`,
            JSON.stringify(cart)
         );
      }
      setChoice(userCart?.address ?? addresses[0]?.id);
   }, [addresses, aimsUserInfo?.id, setUserCart, userCart]);

   useEffect(() => {
      axios.get("/api/shipping-method").then(({ data }) => {
         setShippingMethods(data);
      });
   }, []);

   useEffect(() => {
      if (!aimsUserInfo) {
         // alert("Please check your Authorization");
         return;
      }
      getDeliveryInfos();
   }, [aimsUserInfo, getDeliveryInfos]);

   useEffect(() => {
      if(!location.pathname.includes("order-process")) return;
      let cart = localStorage.getItem(`cart${aimsUserInfo.id}`);
      cart = JSON.parse(cart);
      if (!cart?.address) {
         cart.address = addresses[0]?.id;
         cart.addressProvince = addresses[0]?.province;
         localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cart));
         setUserCart({ ...userCart, address: addresses[0]?.id, addressProvince :addresses[0]?.province });
      }
   }, [addresses, aimsUserInfo.id, location.pathname, setUserCart, userCart]);

   const handleRemoveDelivery = (id) => {
      if (!aimsUserInfo) {
         // alert("Please check your Authorization");
         return;
      }
      const isConfirm = window.confirm(
         "Are you sure you want to delete this delivery information?"
      );
      if (!isConfirm) return;
      axios
         .delete("/api/delivery-info/" + id, config)
         .then(({ data }) => {
            console.log(data);
            // alert("Delete delivery information successfully");
            getDeliveryInfos();
         })
         .catch((err) => {
            console.error(err);
         });
   };

   return (
      <div
         className="address"
         style={{
            padding: isInOrderProcess ? 0 : "2rem 4rem 6rem",
         }}
      >
         <Button
            variant="outline-secondary"
            className="mb-4 d-flex align-items-center"
            onClick={() => {
               if (isInOrderProcess) {
                  navigate("/order-process/cart");
               } else {
                  navigate("/");
               }
            }}
         >
            <ArrowLeft className="me-3" />
            {isInOrderProcess ? "Back to Cart" : "Back to Home"}
         </Button>
         {addresses.map((address, index) => (
            <div
               style={{
                  backgroundColor:
                     choice === address?.id && isInOrderProcess
                        ? "var(--dark-green-color)"
                        : "white",
                  color:
                     choice === address?.id && isInOrderProcess
                        ? "white"
                        : "black",
               }}
               key={index}
               onClick={() => {
                  if (!isInOrderProcess) return;
                  setChoice(address?.id);
                  let cart = localStorage.getItem(`cart${aimsUserInfo?.id}`);
                  cart = JSON.parse(cart);
                  cart.address = address?.id;
                  cart.addressProvince = address?.province;
                  console.log(shippingMethods);
                  if (
                     address?.province !== "Hà Nội" &&
                     cart.shippingMethod === shippingMethods[1].id
                  ) {
                     cart.shippingMethod = shippingMethods[0].id;
                     cart.shippingFee = shippingMethods[0].shippingFee;
                  }
                  setUserCart(cart);
                  localStorage.setItem(
                     `cart${aimsUserInfo?.id}`,
                     JSON.stringify(cart)
                  );
               }}
               className={`address__choice ${
                  choice === address?.id && isInOrderProcess
                     ? ""
                     : "address__choice-hover"
               }`}
            >
               <div>
                  <h4 className="mb-3">{address.name}</h4>
                  <div className="mb-2 d-flex">
                     <p className="mb-0">{address.address} &nbsp;</p>| &nbsp;
                     <p className="mb-0" style={{ fontWeight: "bold" }}>
                        {address?.province}
                     </p>
                  </div>
                  <p className="mb-0">Contact : {address.phone}</p>
               </div>
               <div className="address__button d-flex flex-column align-items-center justify-content-center">
                  <Button
                     variant="primary"
                     className="mb-2"
                     onClick={(e) => {
                        e.stopPropagation();
                        navigate("/address-form/" + address?.id);
                     }}
                  >
                     Edit
                  </Button>
                  <Button
                     variant="danger"
                     className="mt-2"
                     onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDelivery(address?.id);
                     }}
                  >
                     Remove
                  </Button>
               </div>
            </div>
         ))}
         <hr className="my-4" />
         <Button
            variant="outline-success"
            className="d-flex align-items-center"
            onClick={() => {
               navigate("/address-form");
            }}
         >
            <PlusCircle className="me-2" /> Add new Address
         </Button>
      </div>
   );
};

export default Address;
