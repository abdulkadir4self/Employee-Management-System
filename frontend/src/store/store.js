import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice/employeeSlice";
import authSlice from "./authSlice/authSlice";


const store = configureStore({
    reducer:{
        authSlice,
        employeeSlice,
    }
})

export default store;
