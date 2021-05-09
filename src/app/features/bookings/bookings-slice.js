import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {DEVELOPMENT_SERVER_URL} from "../../../constants/constants";

export const createBooking = createAsyncThunk('bookings/createBookings',
    async ({token, history, ...booking}, {rejectWithValue}) => {
        try {
            const {data} = await axios(
                {
                    url: `${DEVELOPMENT_SERVER_URL}/bookings`,
                    method: 'post',
                    data: {...booking},
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            history.push('/bookings');
            return {data};
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

export const getBookings = createAsyncThunk('bookings/getBookings',
    async ({token}, {rejectWithValue}) => {
        try {
            const {data} = await axios({
                method: 'get',
                url: `${DEVELOPMENT_SERVER_URL}/bookings`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return {data}
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
        message: '',
        nextDisplay: {},
        currentDisplay: {}
    },
    extraReducers: {
        [createBooking.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [createBooking.fulfilled]: (state, action) => {
            state.error = null;
            state.loading = false;
            state.bookings.push(action.payload.data.data);
            state.message = action.payload.data.message
        },
        [createBooking.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
            state.message = action.error.message
        },
        [getBookings.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
            state.bookings = [];
        },
        [getBookings.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.bookings = action.payload.data.data;
        },
        [getBookings.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.bookings = [];
        }
    }
});

const selectBookings = state => state.bookings.bookings;
const selectBookingLoading = state => state.bookings.loading;
const selectBookingsError = state => state.bookings.error;

const selectCurrentDisplay = state => {
    const bookings = selectBookings(state);
    if(bookings.length){
        return bookings[0];
    }else {
        return null;
    }
}

const selectNextDisplay = state => {
    const bookings = selectBookings(state);
    if(bookings.length > 1){
        return bookings[1];
    }else {
        return null;
    }
}

export {selectBookings, selectBookingLoading, selectBookingsError, selectCurrentDisplay, selectNextDisplay};

export default bookingsSlice.reducer;