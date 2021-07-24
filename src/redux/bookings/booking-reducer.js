import {bookings} from "../../data/data";
import {
    CREATE_BOOKING_FAILURE,
    CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS,
    GET_BOOKINGS_FAILURE,
    GET_BOOKINGS_REQUEST,
    GET_BOOKINGS_SUCCESS
} from "./booking-action-types";

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

        case CREATE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                bookings: [...state.bookings, action.payload]
            }
        case CREATE_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const selectBookings = state => state.bookings;

export default bookingReducer;