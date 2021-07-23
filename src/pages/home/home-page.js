import React, {useEffect} from "react";
import Layout from "../../components/layout";
import {Container, Divider, Grid, LinearProgress, makeStyles, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";

import {useHistory} from "react-router-dom";
import Display from "../../components/shared/display";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {Alert} from "@material-ui/lab";
import {selectBookings} from "../../redux/bookings/booking-reducer";

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
            }
        }
    });

    const classes = useStyles();

    const history = useHistory();

    const {loading: authLoading, token} = useSelector(selectAuth);
    const {loading, currentBooking, nextBooking, error} = useSelector(selectBookings);
    useEffect(() => {
        if (!authLoading && !token) {
            history.push('/auth/login');
        }
    }, [authLoading, history, token]);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography className={classes.title} color="textPrimary" variant="h3" align="center">Affixing Now</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                {error && <Alert title={error} severity="error">{error}</Alert>}
                ) : null}
                {currentBooking ? (
                    <Display currentDisplay={currentBooking} nextDisplay={nextBooking}/>
                ) : (
                    <Grid className={classes.noBookingContainer} container={true} justify="center" alignItems="center">
                        <Grid item={true}>
                            <Typography variant="h6" align="center">No Bookings Available</Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default HomePage;