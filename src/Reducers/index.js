import { userReducer } from "./user.reducer";
import { adminReducer } from "./admin.reducer";
import { uiReducer } from "./ui.reducer";

import { combineReducers } from "redux";

export default combineReducers({
    userReducer,
    adminReducer,
    uiReducer
})