import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
   const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const [userInfo, setUserInfo] = useState({
      username: "",
      email: "",
      password: "",
   });

   const [errorMessage, setErrorMessage] = useState("");

   const handleSignup = (e) => {
      e.preventDefault();
      axios
         .post("/api/auth/signup", {
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
         })
         .then((response) => {
            console.log(response);
            setErrorMessage("");
            navigate("/signin")
         })
         .catch((error) => {
            console.error(error.response.data.detail);
            setErrorMessage(error.response.data.detail);
         });
   };

   return (
      <div className="signup">
         <Form onSubmit={(e) => handleSignup(e)}>
            <h2 className="d-flex justify-content-center mb-3">Sign up</h2>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label className="w-100">
                  <div className="d-flex justify-content-between">
                     <p className="mb-0">Username</p>
                     <p className="mb-0" style={{ color: "red" }}>
                        {errorMessage === "User is taken"
                           ? "Username is duplicated"
                           : ""}
                     </p>
                  </div>
               </Form.Label>
               <Form.Control
                  type="text"
                  required
                  placeholder="Enter username"
                  style={{
                     border:
                        errorMessage === "User is taken" ? "2px solid red" : "",
                  }}
                  onChange={(e) => {
                     setUserInfo({ ...userInfo, username: e.target.value });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  onChange={(e) => {
                     setUserInfo({ ...userInfo, email: e.target.value });
                  }}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setUserInfo({ ...userInfo, password: e.target.value });
                  }}
               />
            </Form.Group>
            <div className="d-flex justify-content-lg-center mt-4">
               <Button variant="primary" type="submit" className="px-5">
                  Sign up
               </Button>
            </div>
            <div className="d-flex justify-content-center mt-3">
               Already have an account,&nbsp;{" "}
               <span
                  className="signup__signin-link"
                  onClick={() => {
                     navigate("/signin");
                  }}
               >
                  sign in
               </span>
            </div>
         </Form>
      </div>
   );
};

export default Signup;
