import React from "react";
import {Avatar, Button, CircularProgress, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";

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
    const history = useHistory();

    const {token, loading, user} = useSelector(selectAuth);

    const handleLogoutClick = () => {
        dispatch(signOut(token, history));
    }

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

                <Grid lg={5} item={true} container={true} justify="flex-start" alignItems="center" spacing={2}>
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

                {user && (
                    <Grid spacing={4} alignItems="center" item={true} lg={2} container={true} justify="flex-start">
                        <Grid item={true}>
                            {loading && <CircularProgress variant="indeterminate"/>}
                            <Avatar className={classes.avatar} variant="circular">
                                <Typography className={classes.name} variant="h4">{user.name[0]}</Typography>
                            </Avatar>
                        </Grid>
                        <Grid item={true}>
                            <Button
                                onClick={handleLogoutClick}
                                className={classes.button}
                                variant="outlined"
                                disabled={loading}
                                size="large">
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;