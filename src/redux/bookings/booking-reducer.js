const INITIAL_STATE = {
    bookings: [],
    loading: false,
    error: "",
    singleBooking: {},
    currentBooking: {},
    nextBooking: {}
}

const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const selectBookings = state => state.bookings;

export default bookingReducer;