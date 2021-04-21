import React from "react";
import Layout from "../../components/layout";
import {Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import Booking from "../../components/shared/booking";
import {useSelector} from "react-redux";

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
                minHeight: '65vh'
            },
            noBookingsText: {
                textTransform: "uppercase",
                fontWeight: 700
            }
        }
    });

    const classes = useStyles();

    const bookings = useSelector(state => state.bookings.bookings);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography  color="textPrimary"  variant="h3" align="center">Bookings</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Grid container={true} spacing={5}>
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