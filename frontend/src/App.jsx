import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import ListProductScreen from "./pages/ListProductScreen";
import CreateProduct from "./pages/CreateProduct";
import ListCategoryScreen from "./pages/ListCategoryScreen";
import CategoryCreateScreen from "./pages/CategoryCreateScreen";
import CategoryEditScreen from "./pages/CategoryEditScreen";
import UpdateUserScreen from "./pages/UpdateUserScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import PermissionScreen from "./pages/PermissionScreen";
import CreateRoleScreen from "./pages/CreateRoleScreen";
import AssignRoleToUserScreen from "./pages/AssignRoleToUserScreen";
import EditRoleScreen from "./pages/EditRoleScreen";
import DeleteRoleScreen from "./pages/DeleteRoleScreen";
import HomeScreen from "./pages/HomeScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginScreen from "./pages/LoginScreen";
import { StoreProvider } from "./Store";
import SignupScreen from "./pages/SignupScreen";
import TestPage from "./pages/TestPage";
import ProfileScreen from "./pages/ProfileScreen";
import ListUserScreen from "./pages/ListUserScreen";
import ChatRoom from './components/ChatRoom';
import AboutUsScreen from "./pages/AboutUsScreen";
import DeleteUsersScreen from "./pages/DeleteUsersScreen";
import DisplayUsersScreen from "./pages/DisplayUsersScreen";
import Dashboardpage from "./pages/Dashboard";
import ProductsScreen from "./pages/ProductsScreen";
import CartScreen from "./pages/CartScreen";
import ProductsByCategpry from "./pages/ProductsByCategpry";
import CheckoutScreen from "./pages/CheckoutScreen";
import MyordersScreen from "./pages/MyordersScreen"
import OrdersScreen from "./pages/OrdersScreen"

export const REST_API_BASE_URL = "http://localhost:8081/api";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/product" element={<ProductsScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/updateprofile" element={<ProfileScreen />} />
              <Route path="/create-role" element={<CreateRoleScreen />} />
              <Route path="/assign-role" element={<AssignRoleToUserScreen />} />
              <Route path="/edit-role" element={<EditRoleScreen />} />
              <Route path="/delete-role" element={<DeleteRoleScreen />} />
              <Route path="/Permissionpage" element={<PermissionScreen />} />
              <Route path="/chatpage" element={<ChatRoom />} />
              <Route path="/Dashboard" element={<Dashboardpage />} />
              <Route path="/deleteusers" element={<DeleteUsersScreen />} />
              <Route path="/about-us" element={<AboutUsScreen />} />
              <Route path="/Display-users" element={<DisplayUsersScreen />} />
              <Route path="/updateuser" element={<UpdateUserScreen />} />
              <Route
                path="/list-product"
                element={<ListProductScreen />}
              ></Route>
              <Route
                path="/User-management"
                element={<ListUserScreen />}
              ></Route>
              <Route
                path="/edit-product/:id"
                element={<ProductEditScreen />}
              ></Route>
              <Route path="/list-user" element={<ListUserScreen />}></Route>
              <Route
                path="/edit-user/:id"
                element={<UpdateUserScreen />}
              ></Route>
              <Route
                path="/category/:id"
                element={<ProductsByCategpry />}
              ></Route>
              <Route
                path="/add-category"
                element={<CategoryCreateScreen />}
              ></Route>
              <Route
                path="/list-category"
                element={<ListCategoryScreen />}
              ></Route>
              <Route path="/add-product" element={<CreateProduct />}></Route>
              <Route
                path="/edit-category/:id"
                element={<CategoryEditScreen />}
              ></Route>
               <Route path="/Checkout" element={<CheckoutScreen />} />
               <Route path="/list-orders" element={<MyordersScreen />} />
               <Route path="/Users-orders" element={<OrdersScreen />} />
               
            </Routes>
           
            <ToastContainer position="bottom-center" limit={1} />
            <Footer />
          </StoreProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
