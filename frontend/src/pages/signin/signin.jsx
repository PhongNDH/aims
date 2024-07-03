import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./signin.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../service/userLoginSlice";

const Signin = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   let { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const [userInfo, setUserInfo] = useState({
      username: "",
      password: "",
   });

   const handleSignin = async (e) => {
      e.preventDefault();
      await dispatch(
         login({
            username: userInfo.username,
            password: userInfo.password,
         })
      );
   };

   useEffect(() => {
      if (aimsUserInfo === null) return;
      if (aimsUserInfo.role === "user") navigate("/");
      else if (aimsUserInfo.role === "admin") navigate("/admin/users");
      else if (aimsUserInfo.role === "manager") navigate("/manager/products");
   }, [aimsUserInfo, navigate]);
   return (
      <div
         className="signin"
         onSubmit={(e) => {
            handleSignin(e);
         }}
      >
         <Form>
            <h2 className="d-flex justify-content-center mb-3">Sign in</h2>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Username</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => {
                     setUserInfo({ ...userInfo, username: e.target.value });
                  }}
               />
               <Form.Text className="" style={{ color: "red" }}>
                  {error ? error : " "}
               </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setUserInfo({ ...userInfo, password: e.target.value });
                  }}
               />
               <Form.Text className="" style={{ color: "red" }}>
                  {error ? error : " "}
               </Form.Text>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
               <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <div className="d-flex justify-content-lg-center mt-4">
               <Button variant="primary" type="submit" className="px-5">
                  Sign in
               </Button>
            </div>
            <div className="d-flex justify-content-center mt-3">
               Do not have any account,&nbsp;{" "}
               <span
                  className="signin__signup-link"
                  onClick={() => {
                     navigate("/signup");
                  }}
               >
                  sign up
               </span>
            </div>
         </Form>
      </div>
   );
};

export default Signin;
