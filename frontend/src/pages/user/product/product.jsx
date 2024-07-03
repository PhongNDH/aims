import { useNavigate, useParams } from "react-router-dom";
import "./product.scss";
import { Button, Col, Form, Row, Carousel, Image } from "react-bootstrap";

import { ArrowLeft, StarFill } from "react-bootstrap-icons";

import ProductImage1 from "../../../assets/images/product/product1.png";
import ProductImage4 from "../../../assets/images/product/product4.jpg";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import axios from "axios";
import { CartContext } from "../../../contexts/cart.context";
import { formatDateToDDMMYYYY } from "../../../utils/utils";

const Product = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const { setUserCart } = useContext(CartContext);

   const [productDetail, setProductDetail] = useState({});
   const [quantity, setQuantity] = useState(1);
   const [productType, setProductType] = useState(1);

   const { aimsUserInfo } = useSelector((state) => state.userLogin);

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

   useEffect(() => {
      axios
         .get("/api/product/" + id)
         .then(({ data }) => {
            console.log(data);
            setProductDetail(data);
            setProductType(data.category);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [id]);

   const handleAddToCart = (id) => {
      if (!productDetail || !aimsUserInfo) return;
      let cart = localStorage.getItem(`cart${aimsUserInfo.id}`);
      if (!cart) {
         cart = { products: [] };
         localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cart));
         // cart = localStorage.getItem(`cart${aimsUserInfo.id}`);
      } else {
         cart = JSON.parse(cart);
      }
      cart.products.push({
         productId: id,
         quantity: +quantity,
         price: productDetail?.price,
         imageUrl: productDetail?.imageUrl,
         category: productDetail?.category,
         title: productDetail?.title,
         dimension: productDetail?.dimension,
         weight: productDetail?.weight,
         userId: aimsUserInfo?.id,
      });
      if (!cart.price) cart.price = 0;
      cart.price += +productDetail?.price * quantity;
      setUserCart(cart);
      localStorage.setItem(`cart${aimsUserInfo.id}`, JSON.stringify(cart));
      navigate("/order-process/cart");
   };


   return (
      <div className="product">
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
         <div className="mt-4">
            <Row>
               <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  // className="me-5 pe-5"
               >
                  <div className="product__type d-flex">
                     <p
                        style={{ color: "grey" }}
                     >{`${productDetail?.title} /`}</p>
                     <p>
                        &nbsp;
                        {productDetail?.category}
                     </p>
                  </div>
                  <div className="product__name mt-3">
                     <h2>{productDetail?.title}</h2>
                  </div>
                  <div className="product__price-rating mt-4 d-flex justify-content-between">
                     <div>
                        <p className="mb-1">{`${productDetail?.price
                           ?.toString()
                           ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`}</p>
                     </div>
                     <div className="d-flex align-items-center">
                        <div>Quantity : &nbsp; </div>
                        <div>{productDetail?.quantity} &nbsp;</div>{" "}
                     </div>
                  </div>
                  <div className="product__price-rating mt-2 d-flex justify-content-between">
                     <div className="d-flex align-items-center">
                        <div>Dimension : &nbsp; </div>
                        <div>{productDetail?.dimension} &nbsp;</div>{" "}
                     </div>
                     <div className="d-flex align-items-center">
                        <div>Weight : &nbsp; </div>
                        <div>{productDetail?.weight} &nbsp;</div>{" "}
                     </div>
                  </div>
                  {/* <div className="product__description mt-3">
                     {product.description}
                  </div> */}
                  <div className="mt-4" style={{ border: "1px solid black" }}>
                     {productType === "book" && (
                        <div className="mt-0">
                           <MDBTable className="mb-0">
                              <MDBTableBody>
                                 <tr className="table-success">
                                    <th scope="row">Author</th>
                                    <td>{productDetail?.author}</td>
                                 </tr>
                                 <tr className="table-secondary">
                                    <th scope="row">Publisher</th>
                                    <td>{productDetail?.publisher}</td>
                                 </tr>
                                 <tr className="table-primary">
                                    <th scope="row">Cover Type</th>
                                    <td>{productDetail?.coverType}</td>
                                 </tr>
                                 <tr className="table-danger">
                                    <th scope="row">Page Number</th>
                                    <td>{productDetail?.pages}</td>
                                 </tr>
                                 <tr className="table-light">
                                    <th scope="row">Language</th>
                                    <td>{productDetail?.language}</td>
                                 </tr>
                                 <tr className="table-warning">
                                    <th scope="row">Publication Date</th>
                                    <td>
                                       {formatDateToDDMMYYYY(
                                          productDetail?.publicationDate
                                       )}
                                    </td>
                                 </tr>
                              </MDBTableBody>
                           </MDBTable>
                        </div>
                     )}
                     {productType === "dvd" && (
                        <div className="mt-0">
                           <MDBTable className="mb-0">
                              <MDBTableBody>
                                 <tr className="table-primary">
                                    <th scope="row">Disc Type</th>
                                    <td>{productDetail?.discType}</td>
                                 </tr>
                                 <tr className="table-secondary">
                                    <th scope="row">Director</th>
                                    <td>{productDetail?.director}</td>
                                 </tr>
                                 <tr className="table-success">
                                    <th scope="row">Runtime</th>
                                    <td>{productDetail?.runtime}</td>
                                 </tr>
                                 <tr className="table-danger">
                                    <th scope="row">Studio</th>
                                    <td>{productDetail?.studio}</td>
                                 </tr>
                                 <tr className="table-warning">
                                    <th scope="row">Language</th>
                                    <td>{productDetail?.language}</td>
                                 </tr>
                                 <tr className="table-info">
                                    <th scope="row">Subtitles</th>
                                    <td>{productDetail?.subtitles}</td>
                                 </tr>
                                 <tr className="table-light">
                                    <th scope="row">Release Date</th>
                                    <td>
                                       {formatDateToDDMMYYYY(
                                          productDetail?.releaseDate
                                       )}
                                    </td>
                                 </tr>
                              </MDBTableBody>
                           </MDBTable>
                        </div>
                     )}
                     {productType === "cdlp" && (
                        <div className="mt-0">
                           <MDBTable className="mb-0">
                              <MDBTableBody>
                                 <tr className="table-danger">
                                    <th scope="row">Artist</th>
                                    <td>{productDetail?.artist}</td>
                                 </tr>
                                 <tr className="table-warning">
                                    <th scope="row">Record Label</th>
                                    <td>{productDetail?.recordLabel}</td>
                                 </tr>
                                 <tr className="table-info">
                                    <th scope="row">Track List</th>
                                    <td>{productDetail?.trackList}</td>
                                 </tr>
                              </MDBTableBody>
                           </MDBTable>
                        </div>
                     )}
                  </div>
                  <div className="product__quantity d-flex mt-4">
                     <Form.Group style={{ width: "5rem" }}>
                        <Form.Control
                           onChange={(e) => {
                              setQuantity(e.target.value);
                           }}
                           type="number"
                           placeholder="1"
                           min={1}
                           max={productDetail?.quantity}
                        />
                     </Form.Group>
                     <Button
                        variant="success"
                        className="ms-3"
                        onClick={() => {
                           handleAddToCart(productDetail?.id);
                        }}
                     >
                        Add to cart
                     </Button>
                  </div>
               </Col>
               <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="d-flex justify-content-end"
               >
                  <div className="w-100 ms-5 d-flex justify-content-end">
                     <Image
                        src={
                           productDetail.imageUrl
                              ? productDetail.imageUrl
                              : ProductImage1
                        }
                        width="80%"
                        style={{ aspectRatio: "1/1" }}
                     />
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default Product;
