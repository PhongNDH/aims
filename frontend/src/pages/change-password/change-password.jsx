import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./change-password.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../service/userLoginSlice";
import axios from "axios";
import { ArrowLeft } from "react-bootstrap-icons";

const ChangePassword = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   let { aimsUserInfo } = useSelector((state) => state.userLogin);

   const [error, setError] = useState("");

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const [passwordInfo, setPasswordInfo] = useState({
      oldPassword: "",
      newPassword: "",
   });

   const handleChangePassword = async (e) => {
      e.preventDefault();
      axios
         .post("/api/auth/change-password", passwordInfo, config)
         .then(async ({ data }) => {
            // console.log(data);
            alert("Change password successfully, please login again");
            await dispatch(logout());
            navigate("/");
         })
         .catch((err) => {
            // console.error(err);
            setError(err.response.data.detail);
         });
   };

   // useEffect(() => {
   //    if (aimsUserInfo === null) return;
   //    if (aimsUserInfo.role === "user") navigate("/");
   //    else if (aimsUserInfo.role === "admin") navigate("/admin/users");
   //    else if (aimsUserInfo.role === "manager") navigate("/manager/products");
   // }, [aimsUserInfo, navigate]);

   return (
      <div
         className="change-password"
         onSubmit={(e) => {
            handleChangePassword(e);
         }}
      >
         <div className="d-flex justify-content-center mb-4">
            <Button
               variant="outline-dark"
               className="mb-0 d-flex align-items-center"
               onClick={() => {
                  navigate(-1);
               }}
            >
               <ArrowLeft className="me-3" />
               Back to Home
            </Button>
         </div>
         <Form>
            <h2 className="d-flex justify-content-center mb-3">
               Change password
            </h2>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Current Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter your current password"
                  onChange={(e) => {
                     setPasswordInfo({
                        ...passwordInfo,
                        oldPassword: e.target.value,
                     });
                  }}
               />
               <Form.Text className="" style={{ color: "red" }}>
                  {error ? error : " "}
               </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>New Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  onChange={(e) => {
                     setPasswordInfo({
                        ...passwordInfo,
                        newPassword: e.target.value,
                     });
                  }}
               />
               {/* <Form.Text className="" style={{ color: "red" }}>
                  {error ? error : " "}
               </Form.Text> */}
            </Form.Group>

            <div className="d-flex justify-content-lg-center mt-4">
               <Button variant="primary" type="submit" className="px-5">
                  Change Password
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default ChangePassword;
