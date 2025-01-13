const { configureStore } = require("@reduxjs/toolkit");
import userReducer from "@/app/redux-toolkit/Slices/UserSlice"
import focusDataReducer from "@/app/redux-toolkit/Slices/FocusData"
import streakDataReducer from "@/app/redux-toolkit/Slices/streakData"
export const store = configureStore({
    reducer:{
        userData:userReducer,
        focusData: focusDataReducer,
        streakData:streakDataReducer
    }
})