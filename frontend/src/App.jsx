import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ListProductComponent from "./components/ListProductComponent";
import ProductComponent from "./components/ProductComponent";
import ListCategoryComponent from "./components/ListCategoryComponent";
import CategoryComponent from "./components/CategoryComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryEdit from "./components/CategoryEdit";
import UpdateUserScreen from "./components/UpdateUserScreen";
import ProductEdit from "./components/ProductEdit";
import Permissionpage from "./components/Permissionpage";
import CreateRole from "./components/CreateRole";
import AssignRoleToUser from "./components/AssignRoleToUser";
import EditRole from "./components/EditRole";
import DeleteRole from "./components/DeleteRole";
import HomeScreen from "./pages/HomeScreen";
import HeaderComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
import LoginScreen from "./pages/LoginScreen";
import { StoreProvider } from "./Store";
import SignupScreen from "./pages/SignupScreen";
import TestPage from "./pages/TestPage";
import ProfileScreen from "./components/ProfileScreen";
import ListUserComponent from "./components/ListUserComponent";
import ChatPage from "./pages/ChatPage";

import ContactUs from "./pages/ContactUsPage";

import AboutUsScreen from "./pages/AboutUsScreen";
import UserManagement from "./components/UserMnagement";
import DeleteUsers from "./components/DeleteUsers";
import DisplayUsers from "./components/DisplayUsers";
import Dashboardpage from "./pages/Dashboard";

import CartPage from "./pages/CartPage";
import ProductsComponent from "./components/ProductsComponent";

// import Contact from "./pages/Contact";
// import AboutUs from "./pages/AboutUs";
export const REST_API_BASE_URL = "http://localhost:8081/api";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/product" element={<ProductsComponent />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/updateprofile" element={<ProfileScreen />} />
              <Route path="/create-role" element={<CreateRole />} />
              <Route path="/assign-role" element={<AssignRoleToUser />} />
              <Route path="/edit-role" element={<EditRole />} />
              <Route path="/delete-role" element={<DeleteRole />} />
              <Route path="/Permissionpage" element={<Permissionpage />} />
              <Route path="/chatpage" element={<ChatPage />} />
              <Route path="/Dashboard" element={<Dashboardpage />} />

              <Route path="/contact" element={<ContactUs />} />
              <Route path="/deleteusers" element={<DeleteUsers />} />

              <Route path="/cartpage" element={<CartPage />} />

              <Route path="/about-us" element={<AboutUsScreen />} />
              <Route path="/Display-users" element={<DisplayUsers />} />
              <Route path="/updateuser" element={<UpdateUserScreen />} />

              <Route
                path="/list-product"
                element={<ListProductComponent />}
              ></Route>

              <Route
                path="/User-management"
                element={<ListUserComponent />}
              ></Route>

              <Route path="/edit-product/:id" element={<ProductEdit />}></Route>
              <Route path="/list-user" element={<ListUserComponent />}></Route>
              <Route
                path="/edit-user/:id"
                element={<UpdateUserScreen />}
              ></Route>
              <Route
                path="/add-category"
                element={<CategoryComponent />}
              ></Route>
              <Route
                path="/list-category"
                element={<ListCategoryComponent />}
              ></Route>
              <Route path="/add-product" element={<ProductComponent />}></Route>
              <Route
                path="/edit-category/:id"
                element={<CategoryEdit />}
              ></Route>
            </Routes>
            <ToastContainer position="bottom-center" limit={1} />
            <FooterComponent />
          </StoreProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
