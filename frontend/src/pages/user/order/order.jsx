import { useEffect, useMemo, useState } from "react";
import "./order.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import open from "open";

const Order = () => {
   const { error, loading, aimsUserInfo } = useSelector(
      (state) => state.userLogin
   );
   const navigate = useNavigate();

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   const [orders, setOrder] = useState([]);

   useEffect(() => {
      if (!aimsUserInfo) {
         // alert("Please check your Authorization");
         return;
      }
      axios
         .get("/orders/" + aimsUserInfo?.id, config)
         .then(({ data }) => {
            console.log(data);
            setOrder(data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [aimsUserInfo, config]);

   const handlePayOrder = (id) => {
      axios
         .get(`/api/v1/payment/vn-pay-order/${id}?bankCode=NCB`)
         .then(({ data }) => {
            console.log(data);
            if (data.data.code === "ok") {
               // window.open(window.location.href = data.data.paymentUrl;);
               window.location.href = data.data.paymentUrl
               // axios
               //    .get(`${data.data.paymentUrl}`)
               //    .then(({ data }) => {
               //       console.log(data);
               //    })
               //    .catch((err) => {
               //       console.error(err);
               //    });
            } else {
               console.error("Failed to retrieve payment URL:", data.message);
            }
         })
         .catch((err) => {
            console.error(err);
         });
   };

   return (
      <div className="order">
         <h2>Your Orders</h2>
         <div className="order__body mt-3">
            {orders?.map((order, index) => (
               <div
                  className="order-item d-flex justify-content-between mb-4"
                  key={index}
               >
                  <div>
                     <MDBTable>
                        <MDBTableBody>
                           <tr className="table-primary">
                              <td>Product Price </td>
                              <td>
                                 {order?.totalAmount
                                    ?.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                 &nbsp;
                              </td>
                           </tr>
                           <tr className="table-primary">
                              <td>VAT </td>
                              <td>
                                 {order?.vat
                                    ?.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                 &nbsp;
                              </td>
                           </tr>
                           <tr className="table-primary">
                              <td>Shipping Fee </td>
                              <td>
                                 {order?.shippingFees
                                    ? order?.shippingFees
                                         ?.toString()
                                         .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                    : 0}
                              </td>
                           </tr>
                           <tr className="table-success">
                              <td>Total</td>
                              <td>
                                 {order?.totalFee
                                    ?.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                 &nbsp;VNĐ
                              </td>
                           </tr>
                        </MDBTableBody>
                     </MDBTable>
                  </div>
                  <div className="w-50">
                     <div className="d-flex" style={{ fontSize: "1.25rem" }}>
                        <p className="me-4" style={{ fontWeight: "bold" }}>
                           Address
                        </p>
                        <p>{order?.delivery?.address}</p>
                     </div>
                     <div>
                        {order?.products?.map((product, index) => {
                           return (
                              <div
                                 style={{ height: "50px", fontSize: "1.25rem" }}
                                 key={index}
                                 className="d-flex mb-3"
                              >
                                 <div className="d-flex align-items-center">
                                    {product?.quantity} x{" "}
                                 </div>
                                 <Image
                                    className="ms-3"
                                    src={product?.imageUrl}
                                    height="100%"
                                    style={{ aspectRatio: "1/1" }}
                                 />
                                 <div className="ms-4 d-flex align-items-center">
                                    {product?.title}
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
                  <div className="d-flex align-items-end">
                     {!order.payment && (
                        <Button
                           variant="success"
                           style={{width : "150px"}}
                           onClick={() => {
                              handlePayOrder(order?.id);
                           }}
                        >
                           Pay order
                        </Button>
                     )}
                     {order.payment && (
                        <Button
                           variant="info"
                           style={{width : "150px"}}
                           disabled
                           onClick={() => {
                              handlePayOrder(order?.id);
                           }}
                        >
                           Done!
                        </Button>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
export default Order;
