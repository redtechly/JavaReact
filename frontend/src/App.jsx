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
import HomeScreen from "./pages/HomeScreen";
import HeaderComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
import LoginScreen from "./pages/LoginScreen";
import { StoreProvider } from "./Store";
import SignupScreen from "./pages/SignupScreen";
import TestPage from "./pages/TestPage";
import ProfileScreen from "./components/ProfileScreen";
import ListUserComponent from "./components/ListUserComponent";
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
              <Route path="/test" element={<TestPage />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/updateuser" element={<ProfileScreen />} />
              <Route
                path="/list-product"
                element={<ListProductComponent />}
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
