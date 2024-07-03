import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/adminRoutes";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import ManagerRoutes from "./routes/managerRoutes";
import ChangePassword from "./pages/change-password/change-password";

const App = () => {
   return (
      <div className="App">
         <Header />
         <main style={{paddingTop : "20vh", minHeight:"100vh"}}>
            <Routes>
               <Route path="/signin" element={<Signin/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/change-password" element={<ChangePassword/>}/>
               <Route path="/*" element={<UserRoutes />} />
               <Route path="/admin/*" element={<AdminRoutes />} />
               <Route path="/manager/*" element={<ManagerRoutes />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
};

export default App;
