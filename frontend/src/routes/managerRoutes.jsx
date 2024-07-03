import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/home/home";
import ProductAddition from "../pages/manager/product-addition/product-addition";
import ManagerOrder from "../pages/manager/manager-order/manager-order";

const ManagerRoutes = () => {
   return (
      <div className="manager-routes">
         <Routes>
            {/* <Route path="/users" element={<UsersList />} /> */}
            <Route path="/products" element={<Home />} />
            <Route path="/edit-product/:id" element={<ProductAddition />} />
            <Route path="/add-product" element={<ProductAddition />} />
            <Route path="/order" element={<ManagerOrder />} />

         </Routes>
      </div>
   );
};

export default ManagerRoutes