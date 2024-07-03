import { useEffect, useMemo, useState } from "react";
import "./manager-order.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Image } from "react-bootstrap";

const ManagerOrder = () => {
   const { aimsUserInfo } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${aimsUserInfo?.accessToken}`,
            "Content-Type": "application/json",
         },
      };
   }, [aimsUserInfo]);

   const [orders, setOrders] = useState([]);

   useEffect(() => {
      axios
         .get("/orders/manager/" + aimsUserInfo?.id)
         .then(({ data }) => {
            console.log(data);
            setOrders(data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [aimsUserInfo?.id]);
   return (
      <div className="manager-order-wrap">
         <h2>Your Orders</h2>
         <div className="manager-order">
            {orders?.map((order) => (
               <div className="manager-order__body mb-3 d-flex ">
                  <div className="d-flex flex-column" style={{ width: "50%" }}>
                     <p>Address : {order?.deliveryInfo?.address}</p>
                     <p>Name : {order?.deliveryInfo?.name}</p>
                     <p>Contact : {order?.deliveryInfo?.phone}</p>
                  </div>
                  <div style={{ width: "30%" }}>
                     <p className="mb-1">Quantity : {order.quantity}</p>
                     <p className="mb-1">
                        {order.product.title} | {order.product.category}
                     </p>
                     <p>
                        {order.product.price
                           ?.toString()
                           ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        VNĐ
                     </p>
                  </div>
                  <div className="" style={{ width: "20%" }}>
                     <Image
                        src={order?.product?.imageUrl}
                        height="100px"
                        style={{ aspectRatio: 1 / 1 }}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ManagerOrder;
