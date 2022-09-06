import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {Button, Dialog, DialogActions, DialogContent, Divider, Typography} from "@mui/material";

const ViewBookingDialog = ({open, handleClose, booking}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const {token} = useSelector(selectAuth);

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSetCurrentClick = () => {
        dispatch(updateBooking(booking._id, {status: 'CURRENT'}, token, navigate, handleShowNotification))
    }

    const handleSetNextClick = () => {
        dispatch(updateBooking(booking._id, {status: 'NEXT'}, token, navigate, handleShowNotification))
    }

    const handleSetCompletedClick = () => {
        dispatch(updateBooking(booking._id, {status: 'COMPLETED'}, token, navigate, handleShowNotification))
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography
                    variant="caption">
                    Container
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom={true}>
                    {booking.container}
                </Typography>
                <Divider variant="fullWidth" light={true}/>
                <Typography
                    variant="caption">
                    Product Name
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {booking.product}
                </Typography>
                <Divider variant="fullWidth" light={true} />
                <Typography
                    variant="caption">
                    Company Name
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {booking.company}
                </Typography>
                <Divider variant="fullWidth" light={true} />
                <Typography
                    variant="caption">
                    Driver's Contact
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {booking.contact}
                </Typography>
                <Divider variant="fullWidth" light={true}/>
                <Typography
                    variant="caption">
                    Driver's Name
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {booking.name}
                </Typography>
                <Divider variant="fullWidth" light={true}/>
                <Typography
                    variant="caption">
                    Car Number
                </Typography>
                <Typography variant="h6" gutterBottom={true}>{booking.car}</Typography>
                <Divider variant="fullWidth" light={true}/>
                <Typography
                    variant="caption">
                    Booking date
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.date).toDateString()}
                </Typography>
                <Divider variant="fullWidth" light={true} />
                <Typography
                    variant="caption">
                    Booking Time
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.time).toLocaleTimeString()}
                </Typography>
                <Divider variant="fullWidth" light={true}/>
                <Typography
                    variant="caption">
                    Booking Status
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom={true}>
                    {booking.status}
                </Typography>
            </DialogContent>
            <Divider variant="fullWidth"  light={true}/>
            <DialogActions>
                {booking.status === 'CURRENT' ? (
                    <Button
                        onClick={handleSetCompletedClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large">
                        Completed
                    </Button>
                ) : booking.status === 'COMPLETED' ? (
                    <Button
                        disabled={true}
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large">
                        Completed
                    </Button>
                ) : booking.status === 'NEXT' ? (
                    <Button
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="contained"
                        size="large"
                        disableElevation={true}>
                        Current
                    </Button>
                ) : (
                    <React.Fragment>
                        <Button
                            onClick={handleSetNextClick}
                            fullWidth={true}
                            variant="outlined"
                            size="large">
                            Next
                        </Button>
                        <Button
                            onClick={handleSetCurrentClick}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="large">
                            Current
                        </Button>
                    </React.Fragment>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default ViewBookingDialog;
