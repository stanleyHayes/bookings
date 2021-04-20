import {configureStore} from "@reduxjs/toolkit";
import bookingsReducer from "../app/features/bookings/bookings-slice";

const store = configureStore({
    reducer: {
        bookings: bookingsReducer
    }
});

export default store;