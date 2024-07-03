import "./address-form.scss";

import { Form, Button } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Textarea } from "react-bootstrap-icons";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddressForm = () => {
   const navigate = useNavigate();

   const { id } = useParams();

   const { aimsUserInfo } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   const [deliveryInfo, setDeliveryInfo] = useState({
      name: "",
      phone: "",
      address: "",
      province: "",
      instruction: "",
   });

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   useEffect(() => {
      if (!id) return;
      axios
         .get("/api/delivery-info/" + id, config)
         .then(({ data }) => {
            setDeliveryInfo(data);
            // console.log(data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [config, id]);

   const handleSubmitDeliveryInfo = (e) => {
      e.preventDefault();
      if (!aimsUserInfo) {
         // alert("Please check your Authorization");
         return;
      }
      if (!id) {
         axios
            .post(
               "/api/delivery-info",
               { ...deliveryInfo, userId: aimsUserInfo?.id },
               config
            )
            .then(({ data }) => {
               console.log(data);
               alert("Create delivery information successfully!");
               setDeliveryInfo({
                  name: "",
                  phone: "",
                  address: "",
                  province: "",
                  instruction: "",
               });
            })
            .catch((err) => {
               console.error(err);
            });
      } else {
         axios
            .put(
               "/api/delivery-info/" + id,
               { ...deliveryInfo, userId: aimsUserInfo?.id },
               config
            )
            .then(({ data }) => {
               console.log(data);
               alert("Update delivery information successfully!");
            })
            .catch((err) => {
               console.error(err);
            });
      }
   };

   return (
      <div className="address-form">
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
         <Form
            className="address-form__container px-5"
            onSubmit={handleSubmitDeliveryInfo}
         >
            <h3 className="mb-3 text-center">Add New Delivery Information</h3>
            <hr className="my-4" />
            <div className="d-flex justify-content-between">
               <Form.Group className="mb-3 w-100 me-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     required
                     type="text"
                     placeholder="Enter Name"
                     value={deliveryInfo?.name}
                     onChange={(e) => {
                        setDeliveryInfo({
                           ...deliveryInfo,
                           name: e.target.value,
                        });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3 w-100 ms-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                     required
                     type="tel"
                     placeholder="Enter Phone Number"
                     value={deliveryInfo?.phone}
                     onChange={(e) => {
                        setDeliveryInfo({
                           ...deliveryInfo,
                           phone: e.target.value,
                        });
                     }}
                  />
               </Form.Group>
            </div>

            <Form.Group className="mb-3">
               <Form.Label>Address</Form.Label>
               <Form.Control
                  required
                  type="text"
                  placeholder="Enter Address"
                  value={deliveryInfo?.address}
                  onChange={(e) => {
                     setDeliveryInfo({
                        ...deliveryInfo,
                        address: e.target.value,
                     });
                  }}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Province</Form.Label>
               <Form.Control
                  required
                  type="text"
                  placeholder="Enter Province"
                  value={deliveryInfo?.province}
                  onChange={(e) => {
                     setDeliveryInfo({
                        ...deliveryInfo,
                        province: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Instruction</Form.Label>
               <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder="Enter Instruction"
                  value={deliveryInfo?.instruction}
                  onChange={(e) => {
                     setDeliveryInfo({
                        ...deliveryInfo,
                        instruction: e.target.value,
                     });
                  }}
               />
            </Form.Group>

            <Button
               variant="success"
               type="submit"
               className="address-form__submit-button mt-3"
            >
               {id ? "Edit" : "Create"}
            </Button>
         </Form>
      </div>
   );
};

export default AddressForm;
