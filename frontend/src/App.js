import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { Fragment, useEffect, useState } from 'react';
import Footer from './component/layout/Footer/Footer'
import Home from "./component/Home/Home";
// import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOption from './component/layout/Header/UserOption';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
//import NotFound from "./component/layout/Not Found/NotFound";
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/Aboutus.js';
import SellerRequest from './component/seller/SellerRequest';
import RequestSuccess from './component/seller/RequestSuccess.js'
import SellerList from './component/admin/SellerList';
import ProcessRequest from './component/admin/ProcessRequest.js'



function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStriprApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStriprApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Dorid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])
  return (
    <Router>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route extact path='/process/payment' element={<Payment />} />
            </Route>
          </Routes>
        </Elements>
      )}
      <Fragment>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/contact" element={<Contact />} />
          <Route extact path="/about" element={<About />} />
          <Route extact path="/login" element={<LoginSignUp />} />
          <Route extact path='/sellerrequest' element={<SellerRequest />} />


          <Route extact path='/account' element={isAuthenticated ? <Profile /> : <LoginSignUp />} />
          <Route extact path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />} />
          <Route extact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />} />
          <Route extact path='/login/shipping' element={isAuthenticated ? <Shipping /> : <LoginSignUp />} />
          <Route extact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />} />
          <Route extact path='/success' element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />} />
          <Route extact path='/orders' element={isAuthenticated ? <MyOrders /> : <LoginSignUp />} />
          <Route extact path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />} />
          <Route extact path='/requestSuccess' element={isAuthenticated ? <RequestSuccess /> : <LoginSignUp />} />

          {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>

            <Route extact path='/account' element={<Profile />} />
            <Route extact path='/me/update' element={<UpdateProfile />} />
            <Route extact path='/password/update' element={<UpdatePassword />} />
            <Route extact path='/login/shipping' element={<Shipping />} />
            <Route extact path='/order/confirm' element={<ConfirmOrder />} />
            <Route extact path='/success' element={<OrderSuccess />} />
            <Route extact path='/orders' element={<MyOrders />} />
            <Route extact path='/order/:id' element={<OrderDetails />} />

          </Route> */}

          <Route extact path='/password/forgot' element={<ForgotPassword />} />
          <Route extact path='/password/reset/:token' element={<ResetPassword />} />
          <Route extact path='/Cart' element={<Cart />} />


          {/* <Route isAdmin={true} extact path='/admin/dashboard' element={isAuthenticated ? <Dashboard /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/products' element={isAuthenticated ? <ProductList /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/product' element={isAuthenticated ? <NewProduct /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/product/:id' element={isAuthenticated ? <UpdateProduct /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/orders' element={isAuthenticated ? <OrderList /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/order/:id' element={isAuthenticated ? <ProcessOrder /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/users' element={isAuthenticated ? <UsersList /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/user/:id' element={isAuthenticated ? <UpdateUser /> : <Home />} />
          <Route isAdmin={true} extact path='/admin/reviews' element={isAuthenticated ? <ProductReviews /> : <Home />} /> */}

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={true} />}>

            <Route extact path='/admin/dashboard' element={<Dashboard />} />
            <Route extact path='/admin/products' element={<ProductList />} />
            <Route extact path='/admin/product' element={<NewProduct />} />
            <Route extact path='/admin/product/:id' element={<UpdateProduct />} />
            <Route extact path='/admin/orders' element={<OrderList />} />
            <Route extact path='/admin/order/:id' element={<ProcessOrder />} />
            <Route extact path='/admin/users' element={<UsersList />} />
            <Route extact path='/admin/user/:id' element={<UpdateUser />} />
            <Route extact path='/admin/reviews' element={<ProductReviews />} />
            <Route extact path='/admin/seller' element={<SellerList />} />
            <Route extact path='/admin/seller/:id' element={<ProcessRequest />} />

          </Route>
          {/* <Route path="*" element={window.location.pathname === "/process/payment" ? null : <NotFound />} /> */}

        </Routes>



        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
