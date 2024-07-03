import { useLocation, useNavigate } from "react-router-dom";
import "./transaction-success.scss";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const TransactionSuccess = () => {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const orderId = queryParams.get("orderId");

   const { aimsUserInfo } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   const [transaction, setTransaction] = useState({});

   const navigate = useNavigate();

   useEffect(() => {
      console.log(orderId);
      axios
         .get("/transactions/order/" + orderId)
         .then(({ data }) => {
            console.log(data);
            setTransaction(data.data[0]);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [orderId]);

   useEffect(() => {
      axios
         .put("/orders/status/" + orderId, {}, config)
         .then(({ data }) => {
            console.log(data);
         })
         .catch((err) => {
            console.error(err);
         });
   });

   const formatDateToDDMMYYYY = (date) => {
      date = new Date(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");

      return `${day}-${month}-${year}`;
   };

   return (
      <div className="transaction-success">
         <h1 className="text-center">Your transaction has been completed!</h1>
         <div>
            <Form className="mt-5">
               <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
               >
                  <Form.Label column sm="2">
                     Content
                  </Form.Label>
                  <Col sm="10">
                     <Form.Control
                        type="text"
                        disabled
                        value={transaction?.content}
                     />
                  </Col>
               </Form.Group>
               <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
               >
                  <Form.Label column sm="2">
                     Time
                  </Form.Label>
                  <Col sm="10">
                     <Form.Control
                        type="text"
                        disabled
                        value={
                           transaction?.time?.toString().substring(0, 5) +
                           "  " +
                           formatDateToDDMMYYYY(transaction?.date)
                        }
                     />
                  </Col>
               </Form.Group>
               <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
               >
                  <Form.Label column sm="2">
                     Payment Method
                  </Form.Label>
                  <Col sm="10">
                     <Form.Control
                        type="text"
                        disabled
                        value={transaction?.paymentMethod}
                     />
                  </Col>
               </Form.Group>
               <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
               >
                  <Form.Label column sm="2">
                     Total Amount
                  </Form.Label>
                  <Col sm="10">
                     <Form.Control
                        type="text"
                        disabled
                        value={
                           transaction?.totalAmount
                              ?.toString()
                              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
                        }
                     />
                  </Col>
               </Form.Group>
            </Form>
         </div>
         <div className="d-flex justify-content-center mt-5">
            <Button
               variant="outline-secondary"
               className="mb-4 d-flex align-items-center"
               onClick={() => {
                  navigate("/");
               }}
            >
               <ArrowLeft className="me-3" />
               Back to Home
            </Button>
         </div>
      </div>
   );
};

export default TransactionSuccess;
