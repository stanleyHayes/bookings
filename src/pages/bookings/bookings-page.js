import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {Container, Divider, Grid, LinearProgress, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import Booking from "../../components/shared/booking";
import {useDispatch, useSelector} from "react-redux";
import {
    changeFilter,
    getBookings,
    selectBookingLoading,
    selectBookings,
    selectBookingsError
} from "../../app/features/bookings/bookings-slice";
import {useHistory} from "react-router-dom";
import {selectIsSignedIn, selectToken} from "../../app/features/authentication/auth-slice";

const BookingsPage = () => {

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
            }
        }
    });

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("ALL");
    const handleStatusChange = e => {
        setStatus(e.target.value);
        dispatch(changeFilter(e.target.value));
    }

    const bookings = useSelector(selectBookings);
    const isSignedIn = useSelector(selectIsSignedIn);
    const token = useSelector(selectToken);
    const loading = useSelector(selectBookingLoading);
    const err = useSelector(selectBookingsError);

    useEffect(() => {
        if (!isSignedIn) {
            history.push('/auth/login');
        }
    }, [history, isSignedIn]);

    useEffect(() => {
        if (token) {
            dispatch(getBookings({token}));
        }
    }, [dispatch, token]);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                <Typography color="textPrimary" variant="h3" align="center">Bookings</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                <Grid spacing={4} container={true} justify="space-between" alignItems="center">
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
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                {loading ? <LinearProgress color="secondary" variant="query"/> : err ? (
                    <Typography color="error" variant="h6">{err}</Typography>
                ) : null}

                <Grid container={true} spacing={1}>
                    {
                        bookings.length ? (
                            bookings.map((booking, index) => {
                                return (
                                    <Grid key={index} item={true} xs={12} md={6} lg={4}>
                                        <Booking booking={booking}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            <Grid
                                container={true}
                                justify="center"
                                className={classes.noBookingContainer}
                                alignItems="center">
                                <Grid item={true}>
                                    <Typography
                                        color="textSecondary"
                                        className={classes.noBookingsText}
                                        variant="h5">
                                        No Bookings Available
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>

            </Container>
        </Layout>
    )
}

export default BookingsPage;