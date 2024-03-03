import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ListFoodComponent from "./components/ListFoodComponent";
import FoodComponent from "./components/FoodComponent";
import ListCategoryComponent from "./components/ListCategoryComponent";
import CategoryComponent from "./components/CategoryComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryEdit from "./components/CategoryEdit";
import FoodEdit from "./components/FoodEdit";
import Home from "./pages/Home";
import HeaderComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
// import Contact from "./pages/Contact";
// import AboutUs from "./pages/AboutUs";
export const REST_API_BASE_URL = "/api";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list-food" element={<ListFoodComponent />}></Route>
            <Route path="/add-category" element={<CategoryComponent />}></Route>
            <Route
              path="/list-category"
              element={<ListCategoryComponent />}
            ></Route>
            <Route path="/add-food" element={<FoodComponent />}></Route>
            <Route path="/edit-category/:id" element={<CategoryEdit />}></Route>
            <Route path="/edit-food/:id" element={<FoodEdit />}></Route>
          </Routes>
          <ToastContainer position="bottom-center" limit={1} />
          <FooterComponent />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
