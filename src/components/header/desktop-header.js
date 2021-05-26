import React from "react";
import {Avatar, Button, CircularProgress, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    logout,
    selectIsSignedIn,
    selectLoading,
    selectProfile,
    selectToken
} from "../../app/features/authentication/auth-slice";

const DesktopHeader = () => {

    const useStyles = makeStyles(theme => {
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
            },
            avatar: {
                backgroundColor: theme.palette.primary.light,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: theme.palette.secondary.light
            },
            name: {
                color: theme.palette.text.primary
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const isSignedIn = useSelector(selectIsSignedIn);
    const token = useSelector(selectToken);
    const loading = useSelector(selectLoading);
    const profile = useSelector(selectProfile);

    return (
        <Toolbar variant="regular" color="primary">
            <Grid container={true} justify="space-around" alignItems="center">
                <Grid lg={5} item={true}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.brand} variant="text">
                            Streamline Resources Ghana
                        </Button>
                    </Link>
                </Grid>

                <Grid lg={5} item={true} container={true} justify="flex-start" alignItems="center">
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
                </Grid>

                {isSignedIn ? (
                    <Grid spacing={4} alignItems="center" item={true} lg={2} container={true} justify="flex-start">
                        <Grid item={true}>
                            {loading && <CircularProgress variant="indeterminate"/>}
                            <Avatar className={classes.avatar} variant="circular">
                                <Typography className={classes.name} variant="h4">{profile.name[0]}</Typography>
                            </Avatar>
                        </Grid>
                        <Grid item={true}>
                            <Button
                                onClick={() => dispatch(logout(token))}
                                className={classes.button}
                                variant="outlined"
                                disabled={loading}
                                size="large">
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container={true} justify="flex-start" lg={2} item={true}>
                        <Link className={classes.link} to="/auth/login">
                            <Button className={classes.button} variant="text" size="large">Login</Button>
                        </Link>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;