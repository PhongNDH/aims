import { useSelector } from "react-redux";
import "./user-list.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Trash, PersonUp } from "react-bootstrap-icons";

const UsersList = () => {
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

   const getAllUsers = useCallback(() => {
      axios
         .get("/api/user", config)
         .then(({ data }) => {
            setAllUsers(data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [config]);

   const [allUsers, setAllUsers] = useState([]);

   useEffect(() => {
      getAllUsers();
   }, [getAllUsers]);

   const handleDeleteUser = (id) => {
      let isConfirm = window.confirm(
         "Are you sure you want to delete this user?"
      );
      if (!isConfirm) return;
      axios
         .delete("/api/delete-user/" + id, config)
         .then(() => {
            alert("Delete user successfully");
            getAllUsers();
         })
         .catch((error) => {
            console.log(error);
            alert("Can not delete user");
         });
   };

   const handlePromoteUser = (userId, role) => {
      axios
         .put("/api/user/role/" + userId + "?role=" + role, {}, config)
         .then(() => {
            alert("Update user role successfully");
            getAllUsers();
         })
         .catch((error) => {
            console.log(error);
            alert("Can not update user role");
         });
   };

   //Add user
   const [userInfo, setUserInfo] = useState({
      username: "",
      email: "",
      password: "",
   });

   const [errorMessage, setErrorMessage] = useState("");
   const handleCreateUser = (e) => {
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
            setUserInfo({
               username: "",
               email: "",
               password: "",
            });
            alert("Create user successfully");
            getAllUsers();
         })
         .catch((error) => {
            console.error(error.response.data.detail);
            setErrorMessage(error.response.data.detail);
         });
   };

   return (
      <div className="users-list">
         <div className="users-list__table">
            <h2 style={{ color: "white" }} className="text-center">
               Users List
            </h2>
            <MDBTable bordered>
               <MDBTableHead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Name</th>
                     <th scope="col">Email</th>
                     <th scope="col">Role</th>
                     <th scope="col">Action</th>
                  </tr>
               </MDBTableHead>
               <MDBTableBody>
                  {allUsers.map((user, index) => (
                     <tr>
                        <th scope="row">{index + 1}</th>
                        <td className="" style={{ width: "12%" }}>
                           {user.username}
                        </td>
                        <td className="" style={{ width: "20%" }}>
                           {user.email}
                        </td>
                        <td className="" style={{ width: "10%" }}>
                           {user.role}
                        </td>
                        <td className="d-flex">
                           <Button
                              variant="outline-danger"
                              className="d-flex align-items-center"
                              onClick={() => {
                                 handleDeleteUser(user.id);
                              }}
                           >
                              <Trash /> &nbsp;Delete User
                           </Button>
                           <Button
                              className="d-flex align-items-center ms-3"
                              variant="outline-success"
                              onClick={() => {
                                 handlePromoteUser(user.id, "admin");
                              }}
                           >
                              <PersonUp /> &nbsp;Promote to Administrator
                           </Button>
                           {user.role === "user" && (
                              <Button
                                 className="d-flex align-items-center ms-3"
                                 variant="outline-secondary"
                                 onClick={() => {
                                    handlePromoteUser(user.id, "manager");
                                 }}
                              >
                                 <PersonUp /> &nbsp;Promote to Manager
                              </Button>
                           )}
                        </td>
                     </tr>
                  ))}
               </MDBTableBody>
            </MDBTable>
         </div>
         <div className="users-list__addition">
            <h4 className="text-center">Add New User</h4>
            <hr />
            <Form onSubmit={handleCreateUser}>
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
                     placeholder="Enter username"
                     value={userInfo?.username}
                     style={{
                        border:
                           errorMessage === "User is taken"
                              ? "2px solid red"
                              : "",
                     }}
                     onChange={(e) => {
                        setUserInfo({ ...userInfo, username: e.target.value });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Enter email"
                     value={userInfo?.email}
                     onChange={(e) => {
                        setUserInfo({ ...userInfo, email: e.target.value });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Password"
                     value={userInfo?.password}
                     onChange={(e) => {
                        setUserInfo({ ...userInfo, password: e.target.value });
                     }}
                  />
               </Form.Group>
               <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit" className="px-5 mt-3">
                     Add
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default UsersList;
