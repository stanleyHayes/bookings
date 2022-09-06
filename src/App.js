import './App.css';
import HomePage from "./pages/home/home-page";
import CreateBookingPage from "./pages/bookings/create-booking-page";
import BookingsPage from "./pages/bookings/bookings-page";
import LoginPage from "./pages/authentication/login-page";
import ChangePasswordPage from "./pages/authentication/change-password-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import AccountPage from "./pages/authentication/account-page";
import UpdateBookingPage from "./pages/bookings/update-booking-page";
import TodaysBookings from "./pages/bookings/todays-bookings";
import UpdateProfilePage from "./pages/authentication/update-profile-page";
import RegisterPage from "./pages/authentication/register-page";
import RequireAuth from "./components/shared/require-auth";
import {Route, Routes} from "react-router";
import InvitationsPage from "./pages/invitations/invitations-page";
import InvitationResponsePage from "./pages/invitations/invitation-response-page";
import NotFoundPage from "./pages/404/not-found-page";

function App() {

    return (
        <Routes>
            <Route
                path="/"
                exact={true}
                element={
                    <RequireAuth>
                        <HomePage/>
                    </RequireAuth>
                }/>

            <Route
                path="/new/booking"
                exact={true}
                element={
                    <RequireAuth>
                        <CreateBookingPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/bookings"
                exact={true}
                element={
                    <RequireAuth>
                        <BookingsPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/today"
                exact={true}
                element={
                    <RequireAuth>
                        <TodaysBookings/>
                    </RequireAuth>
                }/>

            <Route
                path="/bookings/:bookingID/update"
                exact={true}
                element={
                    <RequireAuth>
                        <UpdateBookingPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/auth/login"
                exact={true}
                element={
                    <RequireAuth>
                        <LoginPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/auth/register"
                exact={true}
                element={
                    <RequireAuth>
                        <RegisterPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/auth/change-password"
                exact={true}
                element={
                    <RequireAuth>
                        <ChangePasswordPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/auth/update-profile"
                exact={true}
                element={
                    <RequireAuth>
                        <UpdateProfilePage/>
                    </RequireAuth>
                }/>

            <Route
                path="/account"
                exact={true}
                element={
                    <RequireAuth>
                        <AccountPage/>
                    </RequireAuth>
                }/>

            <Route
                path="/auth/forgot-password"
                exact={true}
                element={
                    <RequireAuth>
                        <ForgotPasswordPage/>
                    </RequireAuth>
                }/>

            <Route
                exact={true}
                path="/invitations"
                element={
                    <RequireAuth>
                        <InvitationsPage/>
                    </RequireAuth>}
            />

            <Route
                exact={true}
                path="/invitations/:invitationID/:code"
                element={<InvitationResponsePage/>}
            />


            <Route path="*" element={<RequireAuth>
                <NotFoundPage/>
            </RequireAuth>}/>

        </Routes>
    );
}

export default App;
