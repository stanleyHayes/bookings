import './App.css';
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import CreateBookingPage from "./pages/bookings/create-booking";
import BookingsPage from "./pages/bookings/bookings-page";
import LoginPage from "./pages/authentication/login-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import AccountPage from "./pages/authentication/account-page";

function App() {
    return (
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
    );
}

export default App;
