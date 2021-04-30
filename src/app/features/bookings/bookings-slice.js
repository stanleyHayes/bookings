import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {bookings} from "../../../data/data";
import axios from "axios";
import {DEVELOPMENT_SERVER_URL} from "../../../constants/constants";

export const createBooking = createAsyncThunk('bookings/createBookings',
    async (booking, token) => {
        const {data, message} = await axios(
            {
                url: `${DEVELOPMENT_SERVER_URL}/bookings`,
                method: 'post',
                data: booking,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return {data, message};
    });

export const getBookings = createAsyncThunk('bookings/getBookings',
    async (token) => {
        const {bookings, message, count, page} = await axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER_URL}/bookings`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {bookings, message, count, page}
    }
);
const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [...bookings],
        loading: false,
        error: null,
        message: ''
    },
    extraReducers: {
        [createBooking.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [createBooking.fulfilled]: (state, action) => {
            state.error = null;
            state.loading = false;
            state.bookings.push(action.payload.booking);
            state.message = action.payload.message
        },
        [createBooking.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
            state.message = action.payload.message
        }
    }
});

export default bookingsSlice.reducer;