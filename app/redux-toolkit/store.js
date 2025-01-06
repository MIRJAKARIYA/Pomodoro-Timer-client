const { configureStore } = require("@reduxjs/toolkit");
import employeeReducer from "@/app/redux-toolkit/Slices/UserSlice"
export const store = configureStore({
    reducer:{
        employeeData:employeeReducer
    }
})