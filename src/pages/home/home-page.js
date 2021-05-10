import React, {useEffect} from "react";
import Layout from "../../components/layout";
import {Container, Divider, LinearProgress, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import {useHistory} from "react-router-dom";
import {selectIsSignedIn, selectToken} from "../../app/features/authentication/auth-slice";
import {
    getBookings,
    selectBookingLoading, selectBookingsError,
    selectCurrentDisplay,
    selectNextDisplay
} from "../../app/features/bookings/bookings-slice";
import Display from "../../components/shared/display";

const HomePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            }
        }
    });

    const classes = useStyles();

    // const bookings = useSelector();
    const isSignedIn = useSelector(selectIsSignedIn);
    const currentBooking = useSelector(selectCurrentDisplay);
    const nextBooking = useSelector(selectNextDisplay);
    const loading = useSelector(selectBookingLoading);
    const err = useSelector(selectBookingsError);
    const token = useSelector(selectToken);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!isSignedIn) {
            history.push('/auth/login');
        }
    }, [history, isSignedIn]);

    useEffect(() => {
        if(token){
            dispatch(getBookings({token}));
        }
    }, [dispatch, token]);


    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">Affixing Now</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                {loading ? <LinearProgress color="secondary" variant="query"/> : err ? (
                    <Typography color="error" variant="h6">{err}</Typography>
                ) : null}

                {currentBooking && <Display currentDisplay={currentBooking} nextDisplay={nextBooking}/>}
            </Container>
        </Layout>
    )
}

export default HomePage;