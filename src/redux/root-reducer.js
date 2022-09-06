import {combineReducers} from "redux";
import authReducer from "./authentication/auth-reducer";
import bookingReducer from "./bookings/booking-reducer";
import invitationReducer from "./invitations/invitation-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    bookings: bookingReducer,
    invitations: invitationReducer,
});

export default rootReducer;
