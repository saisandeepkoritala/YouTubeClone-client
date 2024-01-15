import {configureStore} from "@reduxjs/toolkit";
import {UserReducer} from "../slices/UserSlice";

const store = configureStore({
    reducer:{
        user:UserReducer
    }
})

export {store};
export * from "../slices/UserSlice";

