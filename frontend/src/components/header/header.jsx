import "./header.scss";

import { Button, Image } from "react-bootstrap";

// import Logo1 from "../../assets/logos/logo1.png";
// import Logo2 from "../../assets/logos/logo2.png";
import Logo from "../../assets/logos/AIMS®.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CartFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/userLoginSlice";
import { Fragment, useEffect, useState } from "react";

const normalNavbar = [
   { text: "Shop", link: "/" },
   { text: "About us", link: "" },
   { text: "Contact", link: "" },
];

const customerNavbar = [
   { text: "Shop", link: "/" },
   { text: "Delivery", link: "/address" },
   { text: "Order", link: "/order" },
   // { text: "Transaction", link: "/transaction" },
   { text: "About us", link: "" },
   { text: "Contact", link: "" },
];              

const adminNavbar = [
   { text: "Users", link: "/admin/users" },
   { text: "Products", link: "/admin/products" },
   // { text: "Payment", link: "/payment" },
   // { text: "About us", link: "" },
   // { text: "Contact", link: "" },
   { text: "About us", link: "" },
   { text: "Contact", link: "" },
];

const managerNavbar = [
   // { text: "Users", link: "/admin/users" },
   { text: "Products", link: "/manager/products" },
   { text: "Order", link: "/manager/order" },
   // { text: "Payment", link: "/payment" },
   // { text: "About us", link: "" },
   // { text: "Contact", link: "" },
   { text: "About us", link: "" },
   { text: "Contact", link: "" },
];

const Header = () => {
   const dispatch = useDispatch();
   const [cartItemsQuantity, setCartItemsQuantity] = useState(0);

   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (!aimsUserInfo) return;
      if (aimsUserInfo.role !== "user") return;
      let cart = localStorage.getItem(`cart${aimsUserInfo?.id}`);
      cart = JSON.parse(cart);
      setCartItemsQuantity(cart?.products?.length ?? 0);
   }, [aimsUserInfo, location]);

   return (
      <div className="header d-flex justify-content-between align-items-center">
         <Link className="header__logo d-flex align-items-center" to="/">
            <Image src={Logo} width="100px" />
         </Link>
         <div className="header__nav d-flex align-items-center">
            {!aimsUserInfo &&
               normalNavbar.map((nav, index) => (
                  <Link to={nav.link} className="text-uppercase" key={index}>
                     {nav.text}
                  </Link>
               ))}
            {aimsUserInfo &&
               aimsUserInfo.role === "user" &&
               customerNavbar.map((nav, index) => (
                  <Link to={nav.link} className="text-uppercase" key={index}>
                     {nav.text}
                  </Link>
               ))}
            {aimsUserInfo &&
               aimsUserInfo.role === "admin" &&
               adminNavbar.map((nav, index) => (
                  <Link to={nav.link} className="text-uppercase" key={index}>
                     {nav.text}
                  </Link>
               ))}
            {aimsUserInfo &&
               aimsUserInfo.role === "manager" &&
               managerNavbar.map((nav, index) => (
                  <Link to={nav.link} className="text-uppercase" key={index}>
                     {nav.text}
                  </Link>
               ))}
         </div>
         {!location.pathname.includes("/cart") &&
            aimsUserInfo &&
            aimsUserInfo.role === "user" && (
               <Link to="/order-process/cart" className="header__cart">
                  <CartFill size="30px" color="black" />
                  {cartItemsQuantity !== 0 && (
                     <div className="header__cart-quantity">
                        {cartItemsQuantity === 0 ? "" : cartItemsQuantity}
                     </div>
                  )}
               </Link>
            )}
         {aimsUserInfo && (
            <div>
               <Button
                  variant="secondary"
                  className="me-4"
                  onClick={async () => {
                     await dispatch(logout());
                     navigate("/");
                  }}
               >
                  Log out
               </Button>
               <Button
                  variant="secondary"
                  onClick={async () => {
                     navigate("/change-password");
                  }}
               >
                  Change password
               </Button>
            </div>
         )}
         {!aimsUserInfo && (
            <div>
               <Button
                  variant="secondary"
                  onClick={() => {
                     navigate("/signin");
                  }}
                  className="me-4"
               >
                  Log in
               </Button>
               <Button
                  variant="secondary"
                  onClick={() => {
                     navigate("/signup");
                  }}
               >
                  Sign up
               </Button>
            </div>
         )}
      </div>
   );
};

export default Header;
