import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {
    Box,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Booking from "../../components/shared/booking";
import {green, grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import {getBookings} from "../../redux/bookings/booking-action-creators";

const TodaysBookings = () => {

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
            noBookingContainer: {
                minHeight: '50vh'
            },
            noBookingsText: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            completed: {
                backgroundColor: green['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            deleted: {
                backgroundColor: red['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            pending: {
                backgroundColor: grey['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },

            visibility: {
                color: green['600'],
                cursor: 'pointer'
            },
            delete: {
                color: red['600'],
                cursor: 'pointer'
            },
            edit: {
                color: grey['600'],
                cursor: 'pointer'
            },
            title: {
                textTransform: 'uppercase'
            }
        }
    });
    const classes = useStyles();

    const {loading, error, bookings} = useSelector(selectBookings);
    const {loading: authLoading, token} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const history = useHistory();
    const dispatch = useDispatch();

    const [status, setStatus] = useState("ALL");
    const handleStatusChange = e => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        if (!authLoading && !token) {
            history.push('/auth/login');
        }
    }, [authLoading, history, token]);


    useEffect(() => {
        const handleShowNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getBookings(token, handleShowNotification));
    }, [dispatch, enqueueSnackbar, token]);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                <Typography
                    className={classes.title}
                    color="textPrimary" variant="h3"
                    align="center">
                    Today's Bookings
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                <Grid spacing={2} container={true} justify="space-between" alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <Typography color="textPrimary" variant="h6">Filter by Status</Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            defaultValue="ALL"
                            variant="outlined"
                            fullWidth={true}
                            margin="none">
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="COMPLETED">Completed</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" className={classes.divider}/>
                {loading && <LinearProgress color="primary" variant="query"/>}
                {error && <Alert title={error} severity="error">{error}</Alert>}
                {bookings && bookings.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            className={classes.noBookingsText}
                            variant="h5">
                            No Bookings Available
                        </Typography>
                    </Box>
                ) : (
                    <Grid container={true} spacing={1}>
                        {bookings.map((booking, index) => {
                            return (
                                <Grid item={true} xs={12} md={6} lg={4}>
                                    <Booking booking={booking}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default TodaysBookings;