import React, {useEffect} from "react";
import Layout from "../../components/layout";
import {Container, Divider, Grid, LinearProgress, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Display from "../../components/shared/display";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {Alert} from "@material-ui/lab";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {getCurrentBooking, getNextBooking} from "../../redux/bookings/booking-action-creators";
import {useSnackbar} from "notistack";

const HomePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84,
                minHeight: 'calc(100vh - (2 * 84px + 2 * 32px ))'
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            noBookingContainer: {
                minHeight: '100%'
            },
            title: {
                textTransform: 'uppercase'
            },
            emptyLabel:{
                textTransform: 'uppercase'
            }
        }
    });

    const classes = useStyles();

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
            <Container className={classes.container}>
                <Typography className={classes.title} color="textPrimary" variant="h3" align="center">
                    Affixing Now
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                {loading && <LinearProgress color="primary" variant="query"/>}
                {error && <Alert title={error} severity="error">{error}</Alert>}
                ) : null}
                {currentBooking ? (
                    <Display currentDisplay={currentBooking} nextDisplay={nextBooking}/>
                ) : (
                    <Grid className={classes.noBookingContainer} container={true} justify="center" alignItems="center">
                        <Grid item={true}>
                            <Typography color="textPrimary" className={classes.emptyLabel} variant="h6" align="center">No Bookings Available</Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default HomePage;