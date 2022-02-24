import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";
import { uiReducer } from "./uiReducer";
import { cartReducer } from "./cartReducer";
import { adminReducer } from "./adminReducer";

export default combineReducers({
    productReducer,
    userReducer,
    categoryReducer,
    uiReducer,
    cartReducer,
    adminReducer
})