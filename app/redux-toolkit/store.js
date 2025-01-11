const { configureStore } = require("@reduxjs/toolkit");
import userReducer from "@/app/redux-toolkit/Slices/UserSlice"
export const store = configureStore({
    reducer:{
        userData:userReducer
    }
})