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
        pendingBookings: [],
        completedBookings: [],
        loading: false,
        error: null,
        message: '',
        filter: 'ALL'
    },
    reducers: {
        changeFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
    extraReducers: {
        [createBooking.pending]: (state) => {
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
        [getBookings.pending]: (state) => {
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

const selectBookingLoading = state => state.bookings.loading;
const selectBookingsError = state => state.bookings.error;
const selectFilter = state => state.bookings.filter;

export const selectCompletedBookings = state => {
    const bookings = state.bookings.bookings;
    if(bookings){
        return bookings.filter(booking => booking.status === 'COMPLETED')
    }
    return []
}

export const selectPendingBookings = state => {
    const bookings = state.bookings.bookings;
    if(bookings){
        return bookings.filter(booking => booking.status === 'PENDING')
    }
    return []
}
export const selectBookings = state => {
    const filter = selectFilter(state);
    switch (filter){
        case 'PENDING':
            return selectPendingBookings(state);
        case 'COMPLETED':
            return selectCompletedBookings(state);
        default:
            return state.bookings.bookings;
    }
}

const selectCurrentDisplay = state => {
    const bookings = selectPendingBookings(state);
    if (bookings && bookings.length) {
        return bookings[0];
    } else {
        return null;
    }
}

const selectNextDisplay = state => {
    const bookings = state.bookings.bookings;
    if (bookings.length > 1) {
        return bookings[1];
    } else {
        return null;
    }
}
export const {changeFilter} = bookingsSlice.actions;
export {selectBookingLoading, selectBookingsError, selectCurrentDisplay, selectNextDisplay, selectFilter};

export default bookingsSlice.reducer;