import "./order-process.scss";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";

// import ProductImage1 from "../../../assets/images/product/product1.png";
// import ProductImage4 from "../../../assets/images/product/product4.jpg";

import { ChevronDoubleRight } from "react-bootstrap-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartContext } from "../../../contexts/cart.context";
import axios from "axios";

const OrderProcess = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   const [buttonContent, setButtonContent] = useState({
      text: "",
      link: "",
   });
   const { userCart, setUserCart } = useContext(CartContext);
   // const [userCart, setUserCart] = useState({});

   const [currentPage, setCurrentPage] = useState();
   const [orderInfo, setOrderInfo] = useState({});
   const [productIds, setProductIds] = useState([]);
   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   useEffect(() => {
      if (location.pathname.includes("/order-process/cart")) {
         setButtonContent({
            text: "Process to Checkout",
            link: "/order-process/address",
         });
      } else if (location.pathname.includes("/order-process/address")) {
         setButtonContent({
            text: "Continue to Shipping",
            link: "/order-process/shipping",
         });
         setCurrentPage("address");
      } else if (location.pathname.includes("/order-process/shipping")) {
         setButtonContent({
            text: "Continue to Payment",
            link: "/order-process/payment",
         });
         setCurrentPage("shipping");
      } else if (location.pathname.includes("/order-process/payment")) {
         setButtonContent({
            text: "Place Your Order and Pay",
            // link: "/order-process/payment",
         });
         setCurrentPage("payment");
      }
   }, [location]);

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const handleSaveOrder = () => {
      if (!location.pathname.includes("/order-process/payment")) {
         navigate(buttonContent.link)
         return;
      }
      // console.log( userCart?.products.map((product) => {
      //    return { productId: product.productId, quantity: product.quantity };
      // }));
      // console.log(userCart?.address,userCart?.shippingMethod)
      if (!userCart?.address) {
         navigate("/order-process/address");
         return;
      }

      if (!userCart?.shippingMethod) {
         navigate("/order-process/shipping");
         return;
      }

      axios
         .post(
            "/api/cart/add",
            userCart?.products.map((product) => {
               return {
                  productId: product.productId,
                  quantity: product.quantity,
               };
            }),
            config
         )
         .then(({ data }) => {
            console.log(data);
            let orderProductIds = data.reduce((acc, orderProduct) => {
               return acc.concat(orderProduct.id + ",");
            }, "");
            setProductIds(data.map((product) => product.id));
            // setUserCart({
            //    ...userCart,
            //    orderProductIds: data.map((product) => product.id),
            // });
            let ids = data.map((product) => product.id);

            orderProductIds = orderProductIds.slice(0, -1);

            axios
               .post(
                  `/orders/${
                     userCart.shippingMethod === 1
                        ? "create-by-delivery-id"
                        : "create-express-order"
                  }?orderProductIds=${orderProductIds}&deliveryId=${
                     userCart.address
                  }`,
                  {},
                  config
               )
               .then(({ data }) => {
                  // navigate("/order")
                  setUserCart({});
                  setOrderInfo(data);

                  console.log(ids);
                  axios
                     .put("/api/cart/order/" + data?.id, ids, config)
                     .then((data) => {
                        console.log(data);
                        localStorage.removeItem(`cart${aimsUserInfo?.id}`);
                        navigate("/order");
                     })
                     .catch((error) => {
                        console.error(error);
                     });
               })
               .catch((error) => {
                  console.error(error);
               });
         })
         .catch((error) => {
            // console.log(error);
            if(error.response.data.status === 507){
               alert(error.response.data.detail);
               navigate("/order-process/cart");
               console.log(error.response.data.detail)
            }
         });
   };

   return (
      <div className="order-process">
         <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={8} xxl={8}>
               {!location.pathname.includes("/order-process/cart") && (
                  <div className="order-process__nav d-flex align-items-center">
                     <h3
                        className="mb-0 me-4"
                        style={{
                           color: currentPage === "address" ? "black" : "grey",
                        }}
                     >
                        Address
                     </h3>
                     <ChevronDoubleRight size="24px" />
                     <h3
                        style={{
                           color: currentPage === "shipping" ? "black" : "grey",
                        }}
                        className="mb-0 mx-4"
                     >
                        Shipping
                     </h3>
                     <ChevronDoubleRight size="24px" />
                     <h3
                        style={{
                           color: currentPage === "payment" ? "black" : "grey",
                        }}
                        className="mb-0 ms-4"
                     >
                        Payment
                     </h3>
                  </div>
               )}
               <Outlet />
            </Col>
            <Col
               xs={12}
               sm={12}
               md={12}
               lg={6}
               xl={4}
               xxl={4}
               className="d-flex justify-content-end"
            >
               <div className="cart__summary">
                  <h4 className="text-center">Order Summary</h4>
                  <div className="d-flex flex-column mt-4">
                     <div className="d-flex justify-content-between">
                        <p>Price</p>
                        <p>
                           {userCart?.price
                              ? userCart?.price
                                   ?.toString()
                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              : 0}
                           &nbsp; VNĐ
                        </p>
                     </div>
                     <div className="d-flex justify-content-between">
                        <p>Shipping</p>
                        <p>
                           {userCart?.shippingFee
                              ? userCart?.shippingFee
                                   .toString()
                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              : 0}{" "}
                           &nbsp; VNĐ
                        </p>
                     </div>
                     <div className="d-flex justify-content-between">
                        <p>VAT</p>
                        <p>
                           {orderInfo?.vat
                              ? orderInfo?.vat
                                   .toString()
                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              : 0}
                           &nbsp; VNĐ
                        </p>
                     </div>
                     {/* <div className="d-flex justify-content-between">
                        <p>Coupon Applied</p>
                        <p>
                           {"10000".replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
                        </p>
                     </div> */}
                     <hr />
                     <div className="d-flex justify-content-between">
                        <p>Total</p>
                        <p>
                           {userCart?.shippingFee || userCart?.price
                              ? (
                                   (userCart?.shippingFee ?? 0) +
                                   (userCart?.price ?? 0)
                                )
                                   .toString()
                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              : 0}
                           &nbsp; VNĐ
                        </p>
                     </div>
                     {/* <div className="d-flex justify-content-between">
                        <p>Estimated Delivery By</p>
                        <p>25/06/2024</p>
                     </div> */}
                     {/* <div>
                        <InputGroup>
                           <Form.Control
                              type="text"
                              placeholder="Coupon code"
                           />
                        </InputGroup>
                     </div> */}
                  </div>
                  <div
                     className="mt-4 d-flex justify-content-center"
                     // onClick={() => {
                     //    navigate(buttonContent.link);
                     // }}
                  >
                     <Button
                        variant="dark"
                        onClick={() => {
                           handleSaveOrder();
                        }}
                     >
                        {buttonContent.text}
                     </Button>
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default OrderProcess;
