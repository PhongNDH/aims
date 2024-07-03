import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/home/home";
import UsersList from "../pages/admin/users-list/user-list";
import ProductAddition from "../pages/manager/product-addition/product-addition";

const AdminRoutes = () => {
   return (
      <div className="admin-routes">
         <Routes>
            <Route path="/users" element={<UsersList />} />
            <Route path="/products" element={<Home />} />
            <Route path="/edit-product/:id" element={<ProductAddition />} />
            <Route path="/add-product" element={<ProductAddition />} />
         </Routes>
      </div>
   );
};

export default AdminRoutes