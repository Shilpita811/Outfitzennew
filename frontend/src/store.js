import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducers, productReviewsReducer, reviewReducer } from "./reducers/productReducers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { allApplicationReducer, applicationReducer, requestDetailsReducer, sellerRequestReducer } from "./reducers/sellerReducer";

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducers,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    reviews: reviewReducer,
    sellerRequest: sellerRequestReducer,
    allRequest: allApplicationReducer,
    application: applicationReducer,
    requestDetails: requestDetailsReducer,
    
});
let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;