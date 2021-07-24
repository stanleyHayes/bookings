import {
    CREATE_BOOKING_FAILURE,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    GET_BOOKING_FAILURE,
    GET_BOOKING_REQUEST,
    GET_BOOKING_SUCCESS,
    GET_BOOKINGS_FAILURE,
    GET_BOOKINGS_REQUEST,
    GET_BOOKINGS_SUCCESS,
    UPDATE_BOOKING_FAILURE,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS
} from "./booking-action-types";
import axios from "axios";
import {STREAMING_RESOURCE_GH_SERVER_URL} from "../../constants/constants";

const createBookingRequest = () => {
    return {
        type: CREATE_BOOKING_REQUEST
    }
}

const createBookingSuccess = booking => {
    return {
        type: CREATE_BOOKING_SUCCESS,
        payload: booking
    }
}

const createBookingFailure = error => {
    return {
        type: CREATE_BOOKING_FAILURE,
        payload: error
    }
}

export const createBooking = (booking, token, history, handleShowNotification) => {
    return dispatch => {
        dispatch(createBookingRequest());
        axios({
            method: 'POST',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/bookings`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: booking
        }).then(res => {
            const {data, message} = res.data;
            dispatch(createBookingSuccess(data));
            history.push('/bookings');
            handleShowNotification(message, {variant: 'success'});
        }).catch(error => {
            dispatch(createBookingFailure(error.response.data.message));
            handleShowNotification(error.response.data.message, {variant: 'error'});
        })
    }
}

const getBookingRequest = () => {
    return {
        type: GET_BOOKING_REQUEST
    }
}

const getBookingSuccess = booking => {
    return {
        type: GET_BOOKING_SUCCESS,
        payload: booking
    }
}

const getBookingFailure = error => {
    return {
        type: GET_BOOKING_FAILURE,
        payload: error
    }
}

export const getBooking = (bookingID, token, handleShowNotification) => {
    return dispatch => {
        dispatch(getBookingRequest());
        axios({
            method: 'GET',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/bookings/${bookingID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const {data, message} = res.data;
            dispatch(getBookingSuccess(data));
            handleShowNotification(message, {variant: 'success'});
        }).catch(error => {
            dispatch(getBookingFailure(error.response.data.message));
            handleShowNotification(error.response.data.message, {variant: 'error'});
        });
    }
}


const updateBookingRequest = () => {
    return {
        type: UPDATE_BOOKING_REQUEST
    }
}

const updateBookingSuccess = booking => {
    return {
        type: UPDATE_BOOKING_SUCCESS,
        payload: booking
    }
}

const updateBookingFailure = error => {
    return {
        type: UPDATE_BOOKING_FAILURE,
        payload: error
    }
}

export const updateBooking = (bookingID, booking, token, history, handleShowNotification) => {
    return dispatch => {
        dispatch(updateBookingRequest());
        axios({
            method: 'PUT',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/bookings/${bookingID}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: booking
        }).then(res => {
            const {data, message} = res.data;
            dispatch(updateBookingSuccess(data));
            history.push(`/bookings/${bookingID}`);
            handleShowNotification(message, {variant: 'success'});
        }).catch(error => {
            dispatch(updateBookingFailure(error.response.data.message));
            handleShowNotification(error.response.data.message, {variant: 'error'});
        })
    }
}

const deleteBookingRequest = () => {
    return {
        type: DELETE_BOOKING_REQUEST
    }
}

const deleteBookingSuccess = booking => {
    return {
        type: DELETE_BOOKING_SUCCESS,
        payload: booking
    }
}

const deleteBookingFailure = error => {
    return {
        type: DELETE_BOOKING_FAILURE,
        payload: error
    }
}

export const deleteBooking = (bookingID, token, history, handleShowNotification) => {
    return dispatch => {
        dispatch(deleteBookingRequest());
        axios({
            method: 'GET',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/bookings/${bookingID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const {data, message} = res.data;
            dispatch(deleteBookingSuccess(data));
            history.push(`/bookings/${bookingID}`);
            handleShowNotification(message, {variant: 'success'});
        }).catch(error => {
            dispatch(deleteBookingFailure(error.response.data.message));
            handleShowNotification(error.response.data.message, {variant: 'error'});
        })
    }
}


const getBookingsRequest = () => {
    return {
        type: GET_BOOKINGS_REQUEST
    }
}

const getBookingsSuccess = bookings => {
    return {
        type: GET_BOOKINGS_SUCCESS,
        payload: bookings
    }
}

const getBookingsFailure = error => {
    return {
        type: GET_BOOKINGS_FAILURE,
        payload: error
    }
}

export const getBookings = (token, handleShowNotification) => {
    return dispatch => {
        dispatch(getBookingsRequest());
        axios({
            method: 'GET',
            url: `${STREAMING_RESOURCE_GH_SERVER_URL}/bookings`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const {data, message} = res.data;
            dispatch(getBookingsSuccess(data));
            handleShowNotification(message, {variant: 'success'});
        }).catch(error => {
            dispatch(getBookingsFailure(error.response.data.message));
            handleShowNotification(error.response.data.message, {variant: 'error'});
        })
    }
}
