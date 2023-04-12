import React, {useEffect} from "react";
import Layout from "../../components/layout";
import {Alert, AlertTitle, Box, Container, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Display from "../../components/shared/display";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {getCurrentBooking, getNextBooking} from "../../redux/bookings/booking-action-creators";
import {useSnackbar} from "notistack";

const HomePage = () => {

    const {token} = useSelector(selectAuth);
    const {loading, currentBooking, nextBooking, error} = useSelector(selectBookings);
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleShowNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getCurrentBooking(token, handleShowNotification));
        dispatch(getNextBooking(token, handleShowNotification));
    }, [dispatch, enqueueSnackbar, token]);


    return (
        <Layout>
            {loading && <LinearProgress color="primary" variant="query"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Typography sx={{color: "text.primary"}} variant="h3" align="center">
                        Affixing Now
                    </Typography>
                    <Divider light={true} sx={{my: 3}} variant="fullWidth"/>

                    {error && <Alert title={error} severity="error">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>}
                    {currentBooking ? (
                        <Display currentDisplay={currentBooking} nextDisplay={nextBooking}/>
                    ) : (
                        <Grid container={true} justifyContent="center" alignItems="center">
                            <Grid item={true} xs={12} md={6}>
                                <Box sx={{
                                    backgroundColor: "background.paper",
                                    padding: 5,
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 32,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 0,
                                }}>
                                    <Typography sx={{color: "text.primary"}} variant="h6" align="center">
                                        No Bookings Available
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </Box>
        </Layout>
    )
}

export default HomePage;
