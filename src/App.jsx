import './App.css'
import { lazy, Suspense } from 'react';
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
const Cart = lazy(() => import("./components/Pages/Cart/Cart"));
const ProductDetail = lazy(() => import("./components/Pages/Product Detail/ProductDetail"));
const Products = lazy(() => import("./components/Pages/Products/Products"));
import { Navigate, Route, Routes } from "react-router-dom";
const Wishlist = lazy(() => import("./components/Pages/Wishlist/Wishlist"));
const Compare = lazy(() => import("./components/Pages/Compare/Compare"));
const Auth = lazy(() => import("./components/Pages/Auth/Auth"));
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from "./components/Hook/useDebounce";
import AuthProvider from './components/context/Auth/AuthProvider';
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
const Profile = lazy(() => import("./components/Pages/Profile/Profile"));
const Checkout = lazy(() => import("./components/Pages/Checkout/Checkout"));
const ThankYou = lazy(() => import("./components/Pages/Thank You/ThankYou"));
const PageNotFound = lazy(() => import("./components/Pages/Page Not Found/PageNotFound"));
import ErrorBoundary from './components/Class Component/ErrorBoundary';
const UserDatabase = lazy(() => import("./components/Pages/UserDataBase/UserDatabase"));
const UnauthorizedRoute = lazy(() => import("./components/Routes/UnauthorizedRoute"));
import ThemeProvider from "./components/context/Theme/ThemeProvider";
import ProductsSkeleton from "./components/Skeletons/ProductsSkeleton";

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const productItems = useSelector((state) => state.productItems.items || []);

  const search = debouncedSearch.toLowerCase();

  const filteredProducts = useMemo(() => {

    if (!search) return productItems;

    return productItems.filter((item) =>
      item.title?.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search)
    );
  }, [search, productItems]);

  return (
    <>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            {/* Header */}
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {/* Main Section */}
            <Suspense fallback={
              <div className="text-center py-10 font-semibold">
                Loading page...
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/products" replace />} />

                <Route path="/products" element={
                  <Suspense fallback={<ProductsSkeleton />}>
                    <Products
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      filteredProducts={filteredProducts}
                    />
                  </Suspense>
                } />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={
                  <ProtectedRoutes allowedRoles={["user", "admin"]}>
                    <Cart />
                  </ProtectedRoutes>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoutes>
                    <Wishlist />
                  </ProtectedRoutes>
                } />
                <Route path="/compare" element={
                  <ProtectedRoutes>
                    <Compare />
                  </ProtectedRoutes>
                } />
                <Route path="/account" element={<Auth />} />
                <Route path="/profile" element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoutes>
                    <Checkout />
                  </ProtectedRoutes>
                } />
                <Route path="/thankyou/:orderId" element={<ThankYou />} />
                <Route path="/all-users" element={
                  <ProtectedRoutes allowedRoles={["admin"]}>
                    <UserDatabase />
                  </ProtectedRoutes>
                } />
                <Route path="/unauthorized" element={<UnauthorizedRoute />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
            {/* Footer */}
            <Footer />
          </AuthProvider>
        </ThemeProvider >
      </ErrorBoundary >
    </>
  )
}

export default App
