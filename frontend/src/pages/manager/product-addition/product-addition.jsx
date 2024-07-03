import axios from "axios";
import { Button, Form, Image } from "react-bootstrap";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product-addition.scss";
import { useSelector } from "react-redux";
import { ArrowLeft, ArrowRight, Trash } from "react-bootstrap-icons";
import { type } from "@testing-library/user-event/dist/type";

const ProductAddition = () => {
   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );
   const initialCdlpInfo = useMemo(() => {
      return { artist: "", recordLabel: "", trackList: "" };
   }, []);
   const initialProductInfo = useMemo(() => {
      return {
         title: "",
         price: undefined,
         category: "",
         imageUrl: "",
         quantity: undefined,
         entryDate: null,
         dimension: undefined,
         weight: undefined,
         sellerId: aimsUserInfo?.id,
      };
   }, [aimsUserInfo?.id]);
   const initialBookInfo = useMemo(() => {
      return {
         publisher: "",
         coverType: "",
         author: "",
         publicationDate: new Date(),
         language: null,
         dimension: undefined,
         weight: undefined,
         pages: undefined,
      };
   }, []);
   const initialDvdInfo = useMemo(() => {
      return {
         director: "",
         studio: "",
         discType: "",
         runtime: "",
         subtitles: "",
         language: "",
         releaseDate: new Date(),
      };
   }, []);

   const [productDetail, setProductDetail] = useState(initialProductInfo);

   const { id } = useParams();
   const navigate = useNavigate();
   const [productType, setProductType] = useState("Book");
   const [bookInfo, setBookInfo] = useState(initialBookInfo);
   const [dvdInfo, setDvdInfo] = useState(initialDvdInfo);
   const [cdlpInfo, setCdlpInfo] = useState(initialCdlpInfo);

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
      if (!aimsUserInfo) {
         alert("Please check your authorization!");
         return;
      }
      axios
         .get("/api/product/" + id)
         .then(({ data }) => {
            console.log(data);
            if (data.sellerId !== aimsUserInfo.id) {
               navigate("/manager/products");
            }
            setProductType(data.category);
            setProductDetail({
               title: data.title,
               category: data.category,
               imageUrl: data.imageUrl,
               price: data.price,
               quantity: data.quantity,
               dimension: data.dimension,
               weight: data.weight,
            });
            switch (data.category) {
               case "book":
                  setProductType("Book");
                  setBookInfo({
                     publisher: data?.publisher,
                     coverType: data?.coverType,
                     author: data?.author,
                     publicationDate: data?.publicationDate,
                     language: data?.language,
                     dimension: data?.dimension,
                     weight: data?.weight,
                     pages: data?.pages,
                  });
                  break;
               case "dvd":
                  setProductType("DVD");
                  setDvdInfo({
                     director: data?.director,
                     discType: data?.discType,
                     runtime: data?.runtime,
                     subtitles: data?.subtitles,
                     studio: data?.studio,
                     language: data?.language,
                     releaseDate: data?.releaseDate,
                  });
                  break;
               case "cdlp":
                  setProductType("CDLP");
                  setCdlpInfo({
                     artist: data?.artist,
                     recordLabel: data?.recordLabel,
                     trackList: data?.trackList,
                  });
                  break;
               default:
            }
         })
         .catch((err) => {
            console.error(err);
         });
   }, [aimsUserInfo, id, navigate]);

   // const handleAdd = (e) => {
   //    e.preventDefault();
   //    console.log(productDetail);
   //    axios
   //       .put("/api/product/modify/" + id, productDetail, config)
   //       .then((response) => {
   //          console.log(response);
   //          alert("Updated product successfully");
   //       })
   //       .catch((error) => {
   //          console.log(error);
   //       });
   // };
   const formatDateToYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
   };

   const handleAdd = (e) => {
      e.preventDefault();
      if (!aimsUserInfo.id) {
         alert("Please check your authentication");
         return;
      }

      switch (productType) {
         case "Book":
            // console.log( {
            //    ...productDetail,
            //    sellerId: aimsUserInfo?.id,
            //    category: "book",
            //    entryDate: formatDateToYYYYMMDD(new Date()),
            // },)
            axios
               .post(
                  "/api/product/add-product",
                  {
                     ...productDetail,
                     sellerId: +aimsUserInfo?.id,
                     category: "book",
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  // console.log(data);
                  // console.log({
                  //    ...bookInfo,
                  //    id: data.id,
                  //    publicationDate: formatDateToYYYYMMDD(
                  //       new Date(bookInfo.publicationDate)
                  //    ),
                  // });
                  axios
                     .post(
                        "/api/product/add-product/books",
                        {
                           ...bookInfo,
                           id: data.id,
                           publicationDate: formatDateToYYYYMMDD(
                              new Date(bookInfo.publicationDate)
                           ),
                        },
                        config
                     )
                     .then(({ data }) => {
                        console.log(data);
                        alert("Created book successfully");
                        setBookInfo(initialBookInfo);
                        setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
                  // setProductDetail(data);
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "DVD":
            axios
               .post(
                  "/api/product/add-product",
                  {
                     ...productDetail,
                     category: "dvd",
                     sellerId: aimsUserInfo?.id,
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  // console.log(data);

                  axios
                     .post(
                        "/api/product/add-product/dvds",
                        {
                           ...dvdInfo,
                           id: data.id,
                           releaseDate: formatDateToYYYYMMDD(
                              new Date(dvdInfo.releaseDate)
                           ),
                        },
                        config
                     )
                     .then(({ data }) => {
                        console.log(data);
                        alert("Created DVD successfully");
                        setDvdInfo(initialDvdInfo);
                        setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
                  // setProductDetail(data);
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "CDLP":
            axios
               .post(
                  "/api/product/add-product",
                  {
                     ...productDetail,
                     sellerId: aimsUserInfo?.id,
                     category: "cdlp",
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  console.log({
                     ...cdlpInfo,
                  });
                  axios
                     .post(
                        "/api/product/add-product/cdlps",
                        {
                           ...cdlpInfo,
                           id: data.id,
                        },
                        config
                     )
                     .then(({ data }) => {
                        console.log(data);
                        alert("Created CDLP successfully");
                        setCdlpInfo(initialCdlpInfo);
                        setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
                  // setProductDetail(data);
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         default:
      }
   };

   const handleEdit = (e) => {
      e.preventDefault();
      if (!aimsUserInfo.id) {
         alert("Please check your authentication");
         return;
      }
      switch (productDetail?.category) {
         case "book":
            axios
               .put(
                  "/api/product/modify/" + id,
                  {
                     ...productDetail,
                     sellerId: +aimsUserInfo?.id,
                     category: "book",
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  axios
                     .put(
                        "/api/product/books/modify/" + id,
                        {
                           ...bookInfo,
                           id: data.id,
                           publicationDate: formatDateToYYYYMMDD(
                              new Date(bookInfo.publicationDate)
                           ),
                        },
                        config
                     )
                     .then(({ data }) => {
                        // console.log(data);
                        alert("Update book successfully");
                        // setBookInfo(initialBookInfo);
                        // setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "dvd":
            axios
               .put(
                  "/api/product/modify/" + id,
                  {
                     ...productDetail,
                     category: "dvd",
                     sellerId: aimsUserInfo?.id,
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  axios
                     .put(
                        "/api/product/dvds/modify/" + id,
                        {
                           ...dvdInfo,
                           id: data.id,
                           releaseDate: formatDateToYYYYMMDD(
                              new Date(dvdInfo.releaseDate)
                           ),
                        },
                        config
                     )
                     .then(({ data }) => {
                        // console.log(data);
                        alert("Created DVD successfully");
                        // setDvdInfo(initialDvdInfo);
                        // setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
                  // setProductDetail(data);
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "cdlp":
            axios
               .put(
                  "/api/product/modify/" + id,
                  {
                     ...productDetail,
                     sellerId: aimsUserInfo?.id,
                     category: "cdlp",
                     entryDate: formatDateToYYYYMMDD(new Date()),
                  },
                  config
               )
               .then(({ data }) => {
                  console.log({
                     ...cdlpInfo,
                  });
                  axios
                     .put(
                        "/api/product/cdlps/modify/" + id,
                        {
                           ...cdlpInfo,
                           id: data.id,
                        },
                        config
                     )
                     .then(({ data }) => {
                        // console.log(data);
                        alert("Update CDLP successfully");
                        // setCdlpInfo(initialCdlpInfo);
                        // setProductDetail(initialProductInfo);
                        window.scrollTo(0, 0);
                     })
                     .catch((err) => {
                        console.error(err);
                     });
                  // setProductDetail(data);
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         default:
      }
   };

   const handleDelete = () => {
      if (!aimsUserInfo.id) {
         alert("Please check your authentication");
         return;
      }
      const isConfirm = window.confirm(
         "Are you sure you want to delete this product?"
      );
      if (!isConfirm) return;

      switch (productDetail?.category) {
         case "book":
            axios
               .delete("/api/product/books/delete/" + id, config)
               .then(({ data }) => {
                  console.log(data);
                  alert("Product deleted successfully");
                  navigate("/manager/products");
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "dvd":
            axios
               .delete("/api/product/dvds/delete/" + id, config)
               .then(({ data }) => {
                  console.log(data);
                  alert("Product deleted successfully");
                  navigate("/manager/products");
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         case "cdlp":
            axios
               .delete("/api/product/cdlps/delete/" + id, config)
               .then(({ data }) => {
                  console.log(data);
                  alert("Product deleted successfully");
                  navigate("/manager/products");
               })
               .catch((err) => {
                  console.error(err);
               });
            break;
         default:
      }
      axios
         .get("/api/product/" + id)
         .then(({ data }) => {
            console.log(data);
         })
         .catch((err) => {
            console.error(err);
         });
   };

   return (
      <div className="product-addition">
         <div className="d-flex align-items-center justify-content-between me-0 pe-3 mt-3">
            <div className="d-flex">
               <h2 className="text-center mb-0">
                  {id ? "Edit Product" : "Add Product"}
               </h2>
               {!id && (
                  <div className="ms-5 product-addition__nav d-flex justify-content-center mt-0">
                     <p
                        className={productType === "Book" ? "active" : ""}
                        onClick={() => {
                           setProductType("Book");
                           setCdlpInfo(initialCdlpInfo);
                           setDvdInfo(initialDvdInfo);
                           setProductDetail(initialProductInfo);
                        }}
                     >
                        Book
                     </p>
                     <p
                        className={productType === "DVD" ? "active" : ""}
                        onClick={() => {
                           setProductType("DVD");
                           setCdlpInfo(initialCdlpInfo);
                           setBookInfo(initialBookInfo);
                           setProductDetail(initialProductInfo);
                        }}
                     >
                        DVD
                     </p>
                     <p
                        className={productType === "CDLP" ? "active" : ""}
                        onClick={() => {
                           setProductType("CDLP");
                           setDvdInfo(initialDvdInfo);
                           setBookInfo(initialBookInfo);
                           setProductDetail(initialProductInfo);
                        }}
                     >
                        CDLP
                     </p>
                  </div>
               )}
            </div>
            <Button
               variant="outline-light"
               className="mb-0 d-flex align-items-center"
               onClick={() => {
                  navigate(-1);
               }}
            >
               <ArrowLeft className="me-3" />
               Back to Home
            </Button>
         </div>
         <hr />

         <Form onSubmit={id ? handleEdit : handleAdd}>
            <Form.Group className="mb-3 w-100 me-3">
               <Form.Label>Title</Form.Label>
               <Form.Control
                  type="text"
                  required
                  placeholder="Enter title"
                  value={productDetail?.title}
                  onChange={(e) => {
                     setProductDetail({
                        ...productDetail,
                        title: e.target.value,
                     });
                  }}
               />
            </Form.Group>
            <Form.Group className="mb-3">
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
            {productDetail.imageUrl !== "" && (
               <div className="w-25 mb-3">
                  <Image
                     src={productDetail?.imageUrl}
                     width="100%"
                     style={{ aspectRatio: "1/1" }}
                  />
               </div>
            )}
            <div className="d-flex justify-content-between">
               <Form.Group className="mb-3 w-100 me-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                     type="number"
                     required
                     placeholder="Enter price"
                     step={0.01}
                     value={+productDetail?.price}
                     onChange={(e) => {
                        setProductDetail({
                           ...productDetail,
                           price: +e.target.value,
                        });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3 w-100 mx-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Enter quantity"
                     step={1}
                     required
                     value={+productDetail?.quantity}
                     onChange={(e) => {
                        setProductDetail({
                           ...productDetail,
                           quantity: +e.target.value,
                        });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3 w-100 mx-3">
                  <Form.Label>Dimension</Form.Label>
                  <Form.Control
                     type="number"
                     step={0.01}
                     placeholder="Enter dimension"
                     value={+productDetail?.dimension}
                     required
                     onChange={(e) => {
                        setProductDetail({
                           ...productDetail,
                           dimension: +e.target.value,
                        });
                     }}
                  />
               </Form.Group>
               <Form.Group className="mb-3 w-100 ms-3">
                  <Form.Label>Weight </Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Enter weight"
                     step={0.01}
                     required
                     value={+productDetail?.weight}
                     onChange={(e) => {
                        setProductDetail({
                           ...productDetail,
                           weight: +e.target.value,
                        });
                     }}
                  />
               </Form.Group>
            </div>
            <hr />
            {productType === "Book" && (
               <Fragment>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                           type="text"
                           step={0.01}
                           required
                           placeholder="Enter author name"
                           value={bookInfo?.author}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 author: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter publisher name"
                           value={bookInfo?.publisher}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 publisher: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Cover Type</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter cover type"
                           value={bookInfo?.coverType}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 coverType: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Page</Form.Label>
                        <Form.Control
                           type="number"
                           required
                           placeholder="Enter total pages"
                           value={+bookInfo?.pages}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 pages: +e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter language"
                           value={bookInfo?.language}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 language: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Publication date</Form.Label>
                        <Form.Control
                           type="date"
                           required
                           placeholder="Enter publication date"
                           value={bookInfo?.publicationDate}
                           onChange={(e) => {
                              setBookInfo({
                                 ...bookInfo,
                                 publicationDate: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
               </Fragment>
            )}
            {productType === "DVD" && (
               <Fragment>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Disc Type</Form.Label>
                        <Form.Control
                           type="text"
                           step={0.01}
                           required
                           placeholder="Enter disc type"
                           value={dvdInfo?.discType}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 discType: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter director"
                           value={dvdInfo?.director}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 director: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Studio</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter studio"
                           value={dvdInfo?.studio}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 studio: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Runtime</Form.Label>
                        <Form.Control
                           type="number"
                           required
                           placeholder="Enter runtime"
                           value={dvdInfo?.runtime}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 runtime: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between">
                     <Form.Group
                        className="mb-3 w-100 me-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter language"
                           value={dvdInfo?.language}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 language: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                     <Form.Group
                        className="mb-3 w-100 ms-3"
                        controlId="formBasicPassword"
                     >
                        <Form.Label>Subtitles</Form.Label>
                        <Form.Control
                           type="text"
                           required
                           placeholder="Enter subtitles"
                           value={dvdInfo?.subtitles}
                           onChange={(e) => {
                              setDvdInfo({
                                 ...dvdInfo,
                                 subtitles: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Release date</Form.Label>
                     <Form.Control
                        type="date"
                        required
                        placeholder="Enter release date"
                        // value={bookInfo?.language}
                        value={dvdInfo?.releaseDate}
                        onChange={(e) => {
                           setDvdInfo({
                              ...dvdInfo,
                              releaseDate: e.target.value,
                           });
                        }}
                     />
                  </Form.Group>
               </Fragment>
            )}
            {productType === "CDLP" && (
               <Fragment>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Artist</Form.Label>
                     <Form.Control
                        type="text"
                        step={0.01}
                        required
                        placeholder="Enter artist name"
                        value={cdlpInfo?.artist}
                        onChange={(e) => {
                           setCdlpInfo({
                              ...cdlpInfo,
                              artist: e.target.value,
                           });
                        }}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Record Label</Form.Label>
                     <Form.Control
                        type="text"
                        required
                        placeholder="Enter record label"
                        value={cdlpInfo?.recordLabel}
                        onChange={(e) => {
                           setCdlpInfo({
                              ...cdlpInfo,
                              recordLabel: e.target.value,
                           });
                        }}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Track List</Form.Label>
                     <Form.Control
                        type="text"
                        required
                        placeholder="Enter track list"
                        value={cdlpInfo?.trackList}
                        onChange={(e) => {
                           setCdlpInfo({
                              ...cdlpInfo,
                              trackList: e.target.value,
                           });
                        }}
                     />
                  </Form.Group>
               </Fragment>
            )}
            <div className="d-flex justify-content-center mt-4">
               <Button
                  style={{ minWidth: "10rem" }}
                  variant="success"
                  type="submit"
                  className="px-5 mt-3 mx-4"
               >
                  {id ? "Edit" : "Create"}
               </Button>
               {id && (
                  <Button
                     variant="danger"
                     type="button"
                     className="px-5 mt-3 mx-4"
                     style={{ minWidth: "10rem" }}
                     onClick={handleDelete}
                  >
                     Delete
                  </Button>
               )}
            </div>
         </Form>
      </div>
   );
};

export default ProductAddition;
