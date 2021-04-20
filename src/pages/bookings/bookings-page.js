import React from "react";
import Layout from "../../components/layout";
import {Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";


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
            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant="h1" align="center">Bookings</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>


                <Grid container={true}>

                </Grid>
            </Container>
        </Layout>
    )
}

export default BookingsPage;