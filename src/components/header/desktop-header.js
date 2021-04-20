import React from "react";
import {Button, Grid, makeStyles, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";

const DesktopHeader = () => {

    const useStyles = makeStyles(() => {
        return {
            link: {
                textDecoration: "none"
            },
            button: {
                fontWeight: 700
            },
            logo: {
                width: 100,
                height: 50
            },
            brand: {
                textTransform: "uppercase",
                fontSize: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Toolbar variant="regular" color="primary">
            <Grid container={true} justify="space-around" alignItems="center">
                <Grid item={true}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.brand} variant="text">
                            Streamline Resources Ghana
                        </Button>
                        <Button variant="text">
                            GRA Affixing Facility
                        </Button>
                    </Link>
                </Grid>

                <Grid lg={7} item={true} container={true} justify="center" alignItems="center">
                    <Grid item={true}>
                        <Link className={classes.link} to="/">
                            <Button className={classes.button} variant="text" size="large">Home</Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to="/bookings">
                            <Button className={classes.button} variant="text" size="large">Bookings</Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to="/new/booking">
                            <Button className={classes.button} variant="text" size="large">Create</Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to="/account">
                            <Button className={classes.button} variant="text" size="large">Account</Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to="/auth/login">
                            <Button className={classes.button} variant="text" size="large">Login</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;