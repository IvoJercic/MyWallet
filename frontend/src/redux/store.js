import { configureStore } from "@reduxjs/toolkit";


//NOVO
import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducer
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { categoryReducer } from "./reducers/categoryReducers";
import { subCategoryReducer } from "./reducers/subCategoryReducers";

const reducer =combineReducers({
    //Reducers
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    category:categoryReducer,
    subcategory:subCategoryReducer
});

const userInfoFromStorage=localStorage.getItem("userInfo")
    ?JSON.parse(localStorage.getItem("userInfo"))
    :null

const initialState={
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk];

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


// export default configureStore({
//     reducer:{
//         user:userReducer
//     }
// })

// // export default store