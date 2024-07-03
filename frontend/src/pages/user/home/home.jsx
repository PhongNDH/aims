import "./home.scss";

import { Col, Row, InputGroup, Form, Button } from "react-bootstrap";

import ProductImage1 from "../../../assets/images/product/product1.png";
import ProductImage2 from "../../../assets/images/product/product2.jpg";

import ProductCard from "../../../components/product-card/product-card";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
   Filter,
   PlusCircle,
   Search,
   SortDown,
   SortUp,
} from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ProductContext } from "../../../contexts/product.context";

const Home = () => {
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

   const { allProducts, setAllProducts } = useContext(ProductContext);

   const location = useLocation();
   // const [isManger, setIsManager] = useState();

   // useEffect(() => {
   //    setIsManager(location.pathname.includes("manager"));
   // }, [location]);

   // const products = [
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 34,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 120000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 5353,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 12356789,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 4343000,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 1200000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 1224,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 1500000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 34254,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 500000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 235,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 3466,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 554,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 38,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 87,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 35,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 45,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 38,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 87,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 35,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 45,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 38,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 87,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage2,
   //       quantity: 35,
   //    },
   //    {
   //       name: "Non arcu risus",
   //       price: 100000,
   //       description:
   //          "Sollicitudin nibh sit amet commodo nulla facilisi. Porttitor eget dolor morbi non arcu. Suspendisse in est ante in nibh mauris cursus mattis molestie.",
   //       image: ProductImage1,
   //       quantity: 45,
   //    },
   // ];

   const filters = [
      {
         name: "Title",
         value: "title",
      },
   ];
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   const [isFilter, setIsFilter] = useState(false);
   const [isSortUp, setIsSortUp] = useState(true);
   // const [filterContent, setFilterContent] = useState("");
   const [page, setPage] = useState(1);
   const [currentProducts, setCurrentProducts] = useState([]);

   const getAllProducts = useCallback(() => {
      if (location.pathname.includes("manager")) {
         if (!aimsUserInfo) {
            // alert("Please check your Authorization");
         }
         axios
            .get("/api/product/user/" + aimsUserInfo?.id)
            .then(({ data }) => {
               console.log(data);
               setAllProducts(data);
               setCurrentProducts(data.slice(0, 20));
            })
            .catch((err) => {
               console.error(err);
            });
      } else {
         axios
            .get("/api/product")
            .then(({ data }) => {
               console.log(data);
               setAllProducts(data);
               setCurrentProducts(data.slice(0, 20));
            })
            .catch((err) => {
               console.error(err);
            });
      }
   }, [aimsUserInfo, location.pathname, setAllProducts]);

   useEffect(() => {
      getAllProducts();
   }, [getAllProducts, setAllProducts]);

   useEffect(() => {
      setCurrentProducts(
         allProducts.slice((page - 1) * 20, (page - 1) * 20 + 20)
      );
   }, [allProducts, page]);

   useEffect(() => {
      if (!isFilter) {
         getAllProducts();
      }
   }, [getAllProducts, isFilter]);

   const handleChangeFilterByTitle = (e) => {
      if (e.target.value === "") {
         getAllProducts();
      } else {
         axios
            .get("/api/product/search/" + e.target.value)
            .then(({ data }) => {
               // console.log(data);
               setAllProducts(data);
               setCurrentProducts(data.slice(0, 20));
            })
            .catch((err) => {
               console.error(err);
            });
      }
   };

   return (
      <div className="home pb-5">
         <div className="home__heading d-flex justify-content-evenly">
            {/* <div className="home__search-bar">
               <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                     <Search
                        color="black"
                        size="20px"
                        className="home__search-icon"
                     />
                  </InputGroup.Text>
                  <Form.Control
                     type="text"
                     className="ps-3"
                     placeholder="Search"
                  />
               </InputGroup>
            </div> */}
            <div className="home__filter">
               <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                     <Filter
                        color="black"
                        size="20px"
                        className="home__search-icon"
                     />
                  </InputGroup.Text>
                  <Form.Select
                     onChange={(e) => {
                        if (e.target.value !== "initial") {
                           setIsFilter(true);
                        } else {
                           setIsFilter(false);
                        }
                     }}
                  >
                     <option value="initial">No Filter</option>
                     {filters.map((filter, index) => (
                        <option value={filter.value} key={index}>
                           {filter.name}
                        </option>
                     ))}
                  </Form.Select>
               </InputGroup>
            </div>
            {isFilter && (
               <div className="home__filter-field">
                  <InputGroup className="mb-3">
                     <InputGroup.Text id="basic-addon1">
                        <div
                           className="home__sort-type"
                           onClick={() => {
                              setIsSortUp(!isSortUp);
                           }}
                        >
                           {isSortUp ? (
                              <SortUp
                                 color="black"
                                 size="20px"
                                 className="home__search-icon"
                              />
                           ) : (
                              <SortDown
                                 color="black"
                                 size="20px"
                                 className="home__search-icon"
                              />
                           )}
                        </div>
                     </InputGroup.Text>
                     <Form.Control
                        type="text"
                        className="ps-3"
                        placeholder="Enter"
                        onChange={(e) => {
                           handleChangeFilterByTitle(e);
                        }}
                     ></Form.Control>
                  </InputGroup>
               </div>
            )}
         </div>
         {location.pathname.includes("manager") && (
            <div className="d-flex justify-content-end mt-3">
               <Button
                  className="d-flex align-items-center"
                  variant="success"
                  onClick={() => {
                     navigate("/manager/add-product");
                  }}
               >
                  <PlusCircle /> &nbsp; Add Product
               </Button>
            </div>
         )}
         <div className="home__products mt-4">
            <Row>
               {currentProducts?.map((product, index) => (
                  <Col
                     key={index}
                     xs={12}
                     sm={12}
                     md={6}
                     lg={4}
                     xl={3}
                     xxl={3}
                     className="home__product-card"
                     onClick={() => {
                        navigate(
                           location.pathname.includes("manager")
                              ? `/manager/edit-product/${product.id}`
                              : `/product/${product.id}`
                        );
                     }}
                  >
                     <ProductCard product={product} />
                  </Col>
               ))}
            </Row>
         </div>
         <div className="home__pagination mt-3">
            <PaginationControl
               page={page}
               between={4}
               total={allProducts?.length}
               limit={20}
               changePage={(page) => {
                  setPage(page);
               }}
               ellipsis={1}
            />
         </div>
      </div>
   );
};

export default Home;
