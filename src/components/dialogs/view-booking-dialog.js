import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {Box, Button, Dialog, DialogActions, DialogContent, Divider, Stack, Typography} from "@mui/material";

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
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
            <DialogContent>
                <Stack direction="column" spacing={2} divider={<Divider variant="fullWidth" light={true}/>}>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Container
                        </Typography>
                        <Typography
                            variant="h4"
                            gutterBottom={true}>
                            {booking.container}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Product Name
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.product}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Company Name
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.company}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Driver's Contact
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.contact}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Driver's Name
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Car Number
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.car}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Booking date
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {new Date(booking.date).toDateString()}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Booking Time
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {new Date(booking.time).toLocaleTimeString()}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary'}}
                            variant="body2">
                            Booking Status
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.status}
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                {booking.status === 'CURRENT' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0
                        }}
                        color="secondary"
                        onClick={handleSetCompletedClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large">
                        Completed
                    </Button>
                ) : booking.status === 'COMPLETED' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0
                        }}
                        disabled={true}
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        color="secondary"
                        variant="outlined"
                        size="large">
                        Completed
                    </Button>
                ) : booking.status === 'NEXT' ? (
                    <Button
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0
                        }}
                        color="secondary"
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
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0
                            }}
                            color="secondary"
                            variant="outlined"
                            size="large">
                            Next
                        </Button>
                        <Button
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0
                            }}
                            color="secondary"
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
