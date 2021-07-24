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
                <Route path="/" exact={true}>
                    <HomePage/>
                </Route>

                <Route path="/new/booking" exact={true}>
                    <CreateBookingPage/>
                </Route>

                <Route path="/bookings" exact={true}>
                    <BookingsPage/>
                </Route>

                <Route path="/today" exact={true}>
                    <TodaysBookings/>
                </Route>


                <Route path="/bookings/:bookingID/update" exact={true}>
                    <UpdateBookingPage/>
                </Route>

                <Route path="/auth/login" exact={true}>
                    <LoginPage/>
                </Route>

                <Route path="/auth/change-password" exact={true}>
                    <ChangePasswordPage/>
                </Route>

                <Route path="/account" exact={true}>
                    <AccountPage/>
                </Route>

                <Route path="/auth/forgot-password" exact={true}>
                    <ForgotPasswordPage/>
                </Route>
            </Switch>
        </ScrollToTop>
    );
}

export default App;
