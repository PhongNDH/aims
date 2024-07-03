import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product-edition.scss";
import { useSelector } from "react-redux";
import { Trash } from "react-bootstrap-icons";

const ProductEdition = () => {
   const { id } = useParams();
   const [productDetail, setProductDetail] = useState({});
   const navigate = useNavigate();

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

   useEffect(() => {
      if (!id) return;
      axios
         .get("/api/product/" + id)
         .then(({ data }) => {
            // console.log(data);
            setProductDetail(data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [id]);

   const handleModify = (e) => {
      e.preventDefault();
      console.log(productDetail);
      axios
         .put("/api/product/modify/" + id, productDetail, config)
         .then((response) => {
            console.log(response);
            alert("Updated product successfully");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const handleDeleteProduct = () => {
      let isConfirm = window.confirm(
         "Are you sure you want to delete this product"
      );
      if (!isConfirm) return;
      axios
         .delete("/api/product/delete/" + id, config)
         .then((response) => {
            console.log(response);
            alert("Delete product successfully");
            navigate("/admin/products");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div className="product-edition">
         <h3 className="text-center">{id ? "Edit Product" : "Add Product"}</h3>
         <div className="d-flex justify-content-end">
            <Button
               variant="danger"
               className="d-flex align-items-center"
               onClick={handleDeleteProduct}
            >
               <Trash /> &nbsp; Delete Product
            </Button>
         </div>
         <hr />
         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title</Form.Label>
            <Form.Control
               type="text"
               required
               placeholder="Enter title"
               value={productDetail?.title}
               onChange={(e) => {
                  setProductDetail({ ...productDetail, title: e.target.value });
               }}
            />
         </Form.Group>
         <Form onSubmit={handleModify}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label className="w-100">Category</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={productDetail?.category}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        category: e.target.value,
                     });
                  }}
                  required
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Image Url</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={productDetail?.imageUrl}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        imageUrl: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Price</Form.Label>
               <Form.Control
                  type="number"
                  required
                  placeholder="Enter price"
                  step={0.01}
                  value={productDetail?.price}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        price: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Quantity</Form.Label>
               <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  step={100}
                  required
                  value={productDetail?.quantity}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        quantity: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Dimension</Form.Label>
               <Form.Control
                  type="number"
                  step={0.01}
                  value={productDetail?.dimension}
                  required
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        dimension: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Weight </Form.Label>
               <Form.Control
                  type="number"
                  placeholder="Enter weight"
                  step={0.01}
                  required
                  value={productDetail?.weight}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        weight: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Type </Form.Label>
               <Form.Select
                  required
                  value={productDetail?.category_id}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        category_id: e.target.value,
                     });
                  }}
               >
                  <option value="1">Book</option>
                  <option value="2">DVDS</option>
                  <option value="3">CDLPS</option>
               </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
               <Button variant="primary" type="submit" className="px-5 mt-3">
                  {id ? "Update" : "Add"}
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default ProductEdition;
