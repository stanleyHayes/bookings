import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {bookings} from "../../../data/data";
import axios from "axios";
import {DEVELOPMENT_SERVER_URL} from "../../../constants/constants";

export const getBookings = createAsyncThunk('bookings/getBookings',
    async (booking, token) => {
        await axios(
            {
                url: `${DEVELOPMENT_SERVER_URL}/bookings`,
                method: 'post',
                data: booking,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    });
const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [...bookings],
        loading: false,
        error: null,
        message: ''
    },
    extraReducers: {
        [getBookings.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getBookings.fulfilled]: (state, action) =>{
            state.error = null;
            state.loading = false;
            state.bookings.push(action.payload.booking);
            state.message = action.payload.message
        },
        [getBookings.rejected]: (state, action) =>{
            state.error = action.payload.message;
            state.loading = false;
            state.message = action.payload.message
        }
    }
});

export default bookingsSlice.reducer;