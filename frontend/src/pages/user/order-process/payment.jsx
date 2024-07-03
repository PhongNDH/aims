import { useEffect, useState } from "react";
import "./payment.scss";

import { Button, Image } from "react-bootstrap";

import VisaImage from "../../../assets/images/payment/visa.jpg";
import MastercardImage from "../../../assets/images/payment/mastercard.png";
import VNPayImage from "../../../assets/images/payment/VnPay.png";
import { PlusCircle, ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = () => {
   const paymentMethods = [
      {
         name: "VNPay",
         image: VNPayImage,
         expireDate: new Date(2028, 6, 26),
         code: "9704198526191432198",
      },
   ];

   const navigate = useNavigate();
   const location = useLocation();

   const [paymentMethodChoice, setPaymentMethodChoice] = useState(0);
   const [isInOrderProcess, setIsInOrderProcess] = useState(false);

   useEffect(() => {
      if (location.pathname.includes("/order-process")) {
         setIsInOrderProcess(true);
      }
   }, [location]);

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   // const config = {
   //    headers: {
   //       Authorization: `Bearer ${aimsUserInfo.token}`,
   //       "Content-Type": "application/json",
   //    },
   // };

   return (
      <div
         className="payment"
         style={{
            padding: isInOrderProcess ? 0 : "2rem 4rem 6rem",
         }}
      >
         <Button
            variant="outline-secondary"
            className="mb-4 d-flex align-items-center"
            onClick={() => {
               if (isInOrderProcess) navigate("/order-process/shipping");
               else navigate("/");
            }}
         >
            <ArrowLeft className="me-3" />
            {isInOrderProcess ? "Back to Shipping" : "Back to Home"}
         </Button>
         <div className="payment__method">
            <h5>Payment Method</h5>
            <div className="payment__method-body">
               {paymentMethods.map((paymentMethod, index) => (
                  <div
                     key={index}
                     className={`px-4 py-3 d-flex justify-content-between ${
                        index === paymentMethodChoice && isInOrderProcess
                           ? "payment__method-type-active"
                           : "payment__method-type"
                     } ${
                        index === 0
                           ? "payment__method-first"
                           : index === paymentMethods.length - 1
                           ? "payment__method-last"
                           : ""
                     }`}
                     onClick={() => {
                        setPaymentMethodChoice(index);
                     }}
                  >
                     <div className="d-flex align-items-center">
                        <div
                           style={{ width: "5rem", border: "1px solid black" }}
                        >
                           <Image
                              src={paymentMethod.image}
                              width="100%"
                              style={{ aspectRatio: 6 / 5 }}
                           />
                        </div>
                        <p className="mb-0 ms-5" style={{ width: "10rem" }}>
                           {paymentMethod.code}
                        </p>
                     </div>
                     <div className="mb-0 ms-5 d-flex align-items-center">
                        Expires &nbsp;
                        {paymentMethod.expireDate.toLocaleDateString("en-GB", {
                           year: "numeric",
                           month: "numeric",
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <hr className="my-4" />
         {/* <Button
            variant="outline-success"
            className="d-flex align-items-center"
            onClick={() => {
               navigate("/payment-form");
            }}
         >
            <PlusCircle className="me-2" /> Add Payment method
         </Button> */}
      </div>
   );
};

export default Payment;
