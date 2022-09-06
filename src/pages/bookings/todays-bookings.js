import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Divider,
    Grid,
    LinearProgress,
    MenuItem,
    Pagination,
    Select,
    Typography
} from "@mui/material";
import Booking from "../../components/shared/booking";
import {useDispatch, useSelector} from "react-redux";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {getTodayBookings} from "../../redux/bookings/booking-action-creators";

const TodaysBookings = () => {

    const {loading, error, bookings, totalBookings} = useSelector(selectBookings);
    const {token} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    const [status, setStatus] = useState("ALL");
    const [page, setPage] = useState(0);
    const query = `page=${page + 1}${status === 'ALL' ? '' : `&status=${status}`}`;

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleStatusChange = e => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        const handleShowNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getTodayBookings(token, query, handleShowNotification));
    }, [dispatch, enqueueSnackbar, query, token]);

    return (
        <Layout>
            {loading && <LinearProgress color="primary" variant="query"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Typography
                        sx={{mb: 4, color: 'text.primary'}}
                        variant="h4"
                        align="center">
                        Today's Bookings
                    </Typography>
                    <Divider light={true} sx={{my: 4}} variant="fullWidth"/>
                    <Grid spacing={2} container={true} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={12} md={6}>
                            <Typography sx={{color: 'text.primary'}} variant="body1">Filter by Status</Typography>
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
                                <MenuItem value="CURRENT">Current</MenuItem>
                                <MenuItem value="NEXT">Next</MenuItem>
                                <MenuItem value="DELETED">Deleted</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Divider light={true} sx={{my: 3}} variant="fullWidth"/>

                    {error && <Alert title={error} severity="error">
                        <AlertTitle>{error}</AlertTitle></Alert>}
                    {bookings && bookings.length === 0 ? (
                        <Box sx={{
                            height: '30vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'background.paper'
                        }}>
                            <Typography
                                align="center"
                                sx={{color: 'text.secondary'}}
                                variant="h5">
                                No Bookings Available
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container={true} spacing={4}>
                            {bookings.map((booking, index) => {
                                return (
                                    <Grid key={index} item={true} xs={12} md={6} lg={4}>
                                        <Booking booking={booking}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )}
                    {totalBookings > 12 && (
                        <React.Fragment>
                            <Divider sx={{my: 4}} light={true} variant="fullWidth"/>
                            <Pagination
                                page={page}
                                onChange={handlePageChange}
                                count={parseInt(`${totalBookings / 12}`)}
                                variant="outlined"
                                size="large"/>
                        </React.Fragment>
                    )}

                </Container>
            </Box>
        </Layout>
    )
}

export default TodaysBookings;
