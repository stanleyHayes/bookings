import {bookings} from "../../data/data";
import {GET_BOOKINGS_FAILURE, GET_BOOKINGS_REQUEST, GET_BOOKINGS_SUCCESS} from "./booking-action-types";

const INITIAL_STATE = {
    bookings: [...bookings],
    loading: false,
    error: "",
    singleBooking: {...bookings[0]},
    currentBooking: {...bookings[0]},
    nextBooking: {...bookings[0]}
}

const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_BOOKINGS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                bookings: action.payload
            }
        case GET_BOOKINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                bookings: []
            }
        default:
            return state;
    }
}

export const selectBookings = state => state.bookings;

export default bookingReducer;