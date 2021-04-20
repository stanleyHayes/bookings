import {createSlice} from "@reduxjs/toolkit";
import {bookings} from "../../../data/data";

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [...bookings],
        loading: false,
        error: null
    }
});

export const {getBookings, createBooking, updateBooking, deleteBooking} = bookingsSlice.actions;
export default bookingsSlice.reducer;