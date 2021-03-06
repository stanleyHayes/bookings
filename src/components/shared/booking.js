import React from "react";
import {Button, Card, CardActions, CardContent, Divider, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {brown, green, grey, purple, red} from "@material-ui/core/colors";

const Booking = ({booking}) => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            subDivider: {
                marginTop: 8,
                marginBottom: 8
            },
            textField: {
                background: "#efefefef",
                marginBottom: 8,
                marginTop: 8
            },
            button: {
                paddingTop: 8,
                paddingBottom: 8,
            },
            title: {
                textTransform: "uppercase"
            },
            caption: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            link: {
                textDecoration: "none",
                width: '100%',
                display: "inline-block"
            },
            completed: {
                backgroundColor: green['600'],
            },
            deleted: {
                backgroundColor: red['600'],
            },
            pending: {
                backgroundColor: grey['600'],
            },
            next: {
                backgroundColor: purple['600'],
            },
            current: {
                backgroundColor: brown['600'],
            },
            currentButton: {
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: theme.palette.primary.dark,
                color: "white"
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const {token} = useSelector(selectAuth);

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSetCurrentClick = () => {
        dispatch(updateBooking(booking._id, {status: 'CURRENT'}, token, history, handleShowNotification))
    }

    const handleSetNextClick = () => {
        dispatch(updateBooking(booking._id, {status: 'NEXT'}, token, history, handleShowNotification))
    }

    const handleSetCompletedClick = () => {
        dispatch(updateBooking(booking._id, {status: 'COMPLETED'}, token, history, handleShowNotification))
    }
    return (
        <Card
            variant="outlined"
            elevation={1}
            className={`${booking.status === 'CURRENT' && classes.current} ${booking.status === 'NEXT' && classes.next} ${booking.status === 'DELETED' && classes.deleted} ${booking.status === 'COMPLETED' && classes.completed} ${booking.status === 'PENDING' && classes.pending}`}>
            <CardContent>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Container
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                    gutterBottom={true}>
                    {booking.container}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Product Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.product}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Company Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.company}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Driver's Contact
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.contact}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Driver's Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.name}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Car Number
                </Typography>
                <Typography color="textPrimary" variant="h6" gutterBottom={true}>{booking.car}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking date
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.date).toDateString()}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking Time
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.time).toLocaleTimeString()}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking Status
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.status}
                </Typography>
            </CardContent>
            <Divider variant="fullWidth" className={classes.subDivider} light={true}/>
            <CardActions>
                {booking.status === 'CURRENT' ? (
                    <Button
                        onClick={handleSetCompletedClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        className={classes.button}>
                        Set Completed
                    </Button>
                ) : booking.status === 'COMPLETED' ? (
                    <Button
                        disabled={true}
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        className={classes.button}>
                        Completed
                    </Button>
                ) : booking.status === 'NEXT' ? (
                    <Button
                        onClick={handleSetCurrentClick}
                        fullWidth={true}
                        variant="contained"
                        size="large"
                        disableElevation={true}
                        className={classes.currentButton}>
                        Set Current
                    </Button>
                ) : booking.status === 'DELETED' ? (
                    <Button
                        disabled={true}
                        fullWidth={true}
                        variant="outlined"
                        size="large"
                        className={classes.button}>
                        Deleted
                    </Button>
                ): (
                    <React.Fragment>
                        <Button
                            onClick={handleSetNextClick}
                            fullWidth={true}
                            variant="contained"
                            size="large"
                            className={classes.button}>
                            Make Next
                        </Button>
                        <Button
                            onClick={handleSetCurrentClick}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="large"
                            className={classes.currentButton}>
                            Make Current
                        </Button>
                    </React.Fragment>
                )}
            </CardActions>
        </Card>
    )
}

export default Booking;