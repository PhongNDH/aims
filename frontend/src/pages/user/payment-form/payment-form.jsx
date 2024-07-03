import "./payment-form.scss";

import { Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PaymentForm = () => {
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   })

   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   //  const config = {
   //    headers: {
   //       Authorization: `Bearer ${aimsUserInfo.token}`,
   //       "Content-Type": "application/json",
   //    },
   // };

   return (
      <div className="payment-form">
         <Button
            variant="outline-secondary"
            className="mb-4 d-flex align-items-center"
            onClick={() => {
               navigate(-1);
            }}
         >
            <ArrowLeft className="me-3" />
            Go Back
         </Button>
         <Form className="payment-form__container">
            <h3 className="mb-3 text-center">Add New Payment</h3>
            <hr className="my-4" />

            <Form.Group className="mb-3">
               <Form.Label>Card Number</Form.Label>
               <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Name on Card</Form.Label>
               <Form.Control type="text" placeholder="" />
            </Form.Group>

            <div className="d-flex justify-content-between">
               <Form.Group className="mb-3" style={{ width: "45%" }}>
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control type="tel" placeholder="" />
               </Form.Group>
               <Form.Group className="mb-3" style={{ width: "45%" }}>
                  <Form.Label>Secure Code</Form.Label>
                  <Form.Control type="tel" placeholder="" />
               </Form.Group>
            </div>

            <Button
               variant="success"
               type="button"
               className="payment-form__submit-button mt-3"
            >
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default PaymentForm;
