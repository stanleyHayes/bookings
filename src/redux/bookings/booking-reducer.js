import {
    CREATE_BOOKING_FAILURE,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    GET_BOOKINGS_FAILURE,
    GET_BOOKINGS_REQUEST,
    GET_BOOKINGS_SUCCESS,
    GET_CURRENT_BOOKING_FAILURE,
    GET_CURRENT_BOOKING_REQUEST,
    GET_CURRENT_BOOKING_SUCCESS,
    GET_NEXT_BOOKING_FAILURE,
    GET_NEXT_BOOKING_REQUEST,
    GET_NEXT_BOOKING_SUCCESS,
    GET_TODAY_BOOKINGS_FAILURE,
    GET_TODAY_BOOKINGS_REQUEST,
    GET_TODAY_BOOKINGS_SUCCESS,
    UPDATE_BOOKING_FAILURE,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS
} from "./booking-action-types";

const INITIAL_STATE = {
    bookings: [],
    loading: false,
    error: null,
    singleBooking: {},
    currentBooking: {},
    nextBooking: {},
    totalBookings: 0,
    todayBookings: [],
    todayBookingsCount: 0
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
                bookings: action.payload.bookings,
                totalBookings: action.payload.totalBookings
            }
        case GET_BOOKINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                bookings: [],
                totalBookings: 0
            }

        case GET_TODAY_BOOKINGS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_TODAY_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                todayBookings: action.payload.bookings,
                todayBookingsCount: action.payload.totalBookings
            }
        case GET_TODAY_BOOKINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                todayBookings: [],
                todayBookingsCount: 0
            }

        case GET_NEXT_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_NEXT_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                nextBooking: action.payload
            }
        case GET_NEXT_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                nextBooking: {}
            }

        case GET_CURRENT_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_CURRENT_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                currentBooking: action.payload
            }
        case GET_CURRENT_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                currentBooking: {}
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

        case DELETE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                bookings: [...state.bookings.map(booking => {
                    if (booking._id === action.payload._id) return action.payload;
                    return booking;
                })]
            }
        case DELETE_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                bookings: [...state.bookings.map(booking => {
                    if (booking._id === action.payload._id) return action.payload;
                    return booking;
                })]
            }
        case UPDATE_BOOKING_FAILURE:
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