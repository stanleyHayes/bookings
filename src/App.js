import './App.css';
import {Route, Switch, useHistory} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import CreateBookingPage from "./pages/bookings/create-booking-page";
import BookingsPage from "./pages/bookings/bookings-page";
import LoginPage from "./pages/authentication/login-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import AccountPage from "./pages/authentication/account-page";
import UpdateBookingPage from "./pages/bookings/update-booking-page";
import {STREAMING_RESOURCE_GH_TOKEN_KEY} from "./constants/constants";
import {useEffect} from "react";
import ScrollToTop from "./components/shared/scroll-to-top";
import TodaysBookings from "./pages/bookings/todays-bookings";
import ProtectedRoute from "./components/shared/protected-route";
import UpdateProfilePage from "./pages/authentication/update-profile-page";
import RegisterPage from "./pages/authentication/register-page";

function App() {

    const history = useHistory();
    const token = localStorage.getItem(STREAMING_RESOURCE_GH_TOKEN_KEY);

    useEffect(() => {
        if (!token) {
            history.push('/auth/login');
        }
    }, [history, token]);

    return (
        <ScrollToTop>
            <Switch>
                <Route path="/" exact={true} component={HomePage}/>

                <ProtectedRoute path="/new/booking" exact={true} component={CreateBookingPage}/>

                <ProtectedRoute path="/bookings" exact={true} component={BookingsPage}/>

                <ProtectedRoute path="/today" exact={true} component={TodaysBookings}/>

                <ProtectedRoute path="/bookings/:bookingID/update" exact={true} component={UpdateBookingPage}/>

                <Route path="/auth/login" exact={true} component={LoginPage}/>

                <Route path="/auth/register" exact={true} component={RegisterPage}/>

                <ProtectedRoute path="/auth/change-password" exact={true} component={ChangePasswordPage}/>

                <ProtectedRoute path="/auth/update-profile" exact={true} component={UpdateProfilePage}/>

                <ProtectedRoute path="/account" exact={true} component={AccountPage}/>

                <Route path="/auth/forgot-password" exact={true} component={ForgotPasswordPage}/>
            </Switch>
        </ScrollToTop>
    );
}

export default App;
