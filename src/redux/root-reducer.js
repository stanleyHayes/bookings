import {combineReducers} from "redux";
import authReducer from "./authentication/auth-reducer";
import bookingReducer from "./bookings/booking-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    bookings: bookingReducer
});

export default rootReducer;