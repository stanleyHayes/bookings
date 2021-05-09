import {configureStore} from "@reduxjs/toolkit";
import bookingsReducer from "../app/features/bookings/bookings-slice";
import authReducer from "../app/features/authentication/auth-slice";

const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        auth: authReducer
    }
});

export default store;