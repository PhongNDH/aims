import "./cart.scss";

import { Form, Image, InputGroup, Button } from "react-bootstrap";

import ProductImage1 from "../../../assets/images/product/product1.png";
import ProductImage4 from "../../../assets/images/product/product4.jpg";

import { Trash3Fill, ArrowLeft } from "react-bootstrap-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { CartContext } from "../../../contexts/cart.context";

const Cart = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useState([]);

   const { userCart, setUserCart } = useContext(CartContext);

   // const [quantity, setQuantity] = useState([1, 1]);

   const handleDecreaseQuantity = (index) => {
      if (cart.products[index].quantity === 1) return;
      let cartTemp = { ...cart };
      let quantity = cartTemp.products[index].quantity - 1;
      cartTemp.products[index].quantity = quantity;
      let price = cartTemp.products.reduce((acc, item) => {
         return acc + item.price * item.quantity;
      }, 0);
      cartTemp.price = price;
      setUserCart(cartTemp);
      setCart(cartTemp);
      localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cartTemp));
   };

   const handleIncreaseQuantity = (index) => {
      // if (cart[index].quantity === 1) return;
      let cartTemp = { ...cart };
      let quantity = cartTemp.products[index].quantity + 1;
      cartTemp.products[index].quantity = quantity;
      let price = cartTemp.products.reduce((acc, item) => {
         return acc + item.price * item.quantity;
      }, 0);
      cartTemp.price = price;
      setUserCart(cartTemp);
      setCart(cartTemp);
      localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cartTemp));
   };

   const handleDeleteCart = (index) => {
      const isConfirm = window.confirm(
         "Are you sure you want to delete this item from the cart?"
      );
      if (!isConfirm) return;
      let cartTemp = { ...cart };
      cartTemp.products.splice(index, 1);
      // console.log(cartTemp);
      let price = cartTemp.products.reduce((acc, item) => {
         return acc + item.price * item.quantity;
      }, 0);
      cartTemp.price = price;
      setUserCart(cartTemp);
      setCart(cartTemp);
      localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cartTemp));
   };

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const { aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   useEffect(() => {
      let cart = localStorage.getItem(`cart${aimsUserInfo?.id}`);
      if (cart) {
         cart = cart = JSON.parse(cart);
         setCart(cart);
      } else {
         setCart([]);
      }
      // console.log(cart);
   }, [aimsUserInfo?.id]);

   // const [ownCart, setOwnCart] = useState();

   // const getOwnCart = useCallback(() => {
   //    axios
   //       .get("/api/carts/customer-cart/" + aimsUserInfo.id, config)
   //       .then(({ data }) => {
   //          // console.log(data);
   //          setOwnCart(data);
   //       })
   //       .catch((err) => {
   //          console.error(err);
   //       });
   // }, [aimsUserInfo.id, config]);

   // useEffect(() => {
   //    if (!aimsUserInfo) return;
   //    getOwnCart();
   // }, [aimsUserInfo, getOwnCart]);

   // const handleDeleteCart = (id) => {
   //    let isConfirm = window.confirm(
   //       "Are you sure you want to delete this cart?"
   //    );
   //    if (!isConfirm) return;
   //    axios
   //       .delete("/api/carts/" + id, config)
   //       .then(({ data }) => {
   //          // console.log(data);
   //          alert("Delete cart successfully");
   //          getOwnCart();
   //       })
   //       .catch((err) => {
   //          console.error(err);
   //       });
   // };

   return (
      <div className="cart">
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
         <h4 className="text-uppercase" style={{ color: "grey" }}>
            {cart?.product?.length} items
         </h4>
         {cart?.products?.map((product, index) => (
            <div key={index} className="cart__product mt-4 d-flex">
               <div className="cart__product-image">
                  <Image
                     src={product.imageUrl || ProductImage1}
                     height="100%"
                     style={{ aspectRatio: "1/1" }}
                  />
               </div>
               <div className="cart__product-info py-2 px-4">
                  <p className="cart__product-name mb-1">{product?.title}</p>
                  <p className="cart__product-price mb-1 mt-2">{`${product?.price
                     ?.toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`}</p>
                  <div className="d-flex">
                     <p style={{ color: "grey" }} className="mb-1">
                        Category
                     </p>
                     <p className="mb-1 ms-2" style={{ fontWeight: "bold" }}>
                        {product?.category}
                     </p>
                  </div>
                  {/* <div className="d-flex">
                     <p style={{ color: "grey" }} className="mb-1">
                        Category
                     </p>
                     <p className="mb-1 ms-2">{product?.quantity}</p>
                  </div> */}
               </div>
               <div className="cart__product-quantity d-flex align-items-center justify-content-center">
                  <InputGroup className="" style={{ width: "8rem" }}>
                     <InputGroup.Text
                        className="button"
                        style={{ minWidth: "2.25rem" }}
                        onClick={() => {
                           handleDecreaseQuantity(index);
                        }}
                     >
                        -
                     </InputGroup.Text>
                     <Form.Control
                        type="text"
                        readOnly
                        value={product?.quantity}
                        // style={{ minWidth: "3rem" }}
                     />
                     <InputGroup.Text
                        style={{ minWidth: "2.25rem" }}
                        className="button"
                        onClick={() => {
                           handleIncreaseQuantity(index);
                        }}
                     >
                        +
                     </InputGroup.Text>
                  </InputGroup>
               </div>
               <div className="cart__product-trash button d-flex justify-content-center align-items-center">
                  <Trash3Fill
                     size="30px"
                     color="black"
                     onClick={() => {
                        handleDeleteCart(index);
                     }}
                  />
               </div>
            </div>
         ))}
      </div>
   );
};

export default Cart;
