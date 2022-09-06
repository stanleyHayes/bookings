import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {Box, Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";

const Booking = ({booking}) => {

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
        <Card
            sx={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderTopLeftRadius: 0
            }}
            variant="elevation"
            elevation={1}>
            <CardContent>
                <Stack direction="column" spacing={2}>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary', mb: 1}}
                            variant="body2">
                            Container
                        </Typography>
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="body1"
                            gutterBottom={true}>
                            {booking.container}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
                            sx={{color: 'text.secondary', mb: 1}}
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
            </CardContent>
            <CardActions>
                {booking.status === 'CURRENT' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0,
                            textTransform: 'capitalize'
                        }}
                        onClick={handleSetCompletedClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        disableElevation={true}>
                        Set Completed
                    </Button>
                ) : booking.status === 'COMPLETED' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0,
                            textTransform: 'capitalize'
                        }}
                        disabled={true}
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        disableElevation={true}>
                        Completed
                    </Button>
                ) : booking.status === 'NEXT' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0,
                            textTransform: 'capitalize'
                        }}
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="contained"
                        size="large"
                        disableElevation={true}>
                        Set Current
                    </Button>
                ) : booking.status === 'DELETED' ? (
                    <Button
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0,
                            textTransform: 'capitalize'
                        }}
                        disabled={true}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        disableElevation={true}>
                        Deleted
                    </Button>
                ) : (
                    <React.Fragment>
                        <Button
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                                textTransform: 'capitalize'
                            }}
                            onClick={handleSetNextClick}
                            fullWidth={true}
                            variant="outlined"
                            size="large"
                            disableElevation={true}>
                            Make Next
                        </Button>
                        <Button
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                                textTransform: 'capitalize'
                            }}
                            onClick={handleSetCurrentClick}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="large">
                            Make Current
                        </Button>
                    </React.Fragment>
                )}
            </CardActions>
        </Card>
    )
}

export default Booking;
