import {Avatar, Button, CircularProgress, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import {ExitToApp, Menu} from "@material-ui/icons";
import {
    logout,
    selectIsSignedIn,
    selectLoading,
    selectProfile,
    selectToken
} from "../../app/features/authentication/auth-slice";
import {useDispatch, useSelector} from "react-redux";

const MobileHeader = ({handleDrawerOpen}) => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: "none"
            },
            button: {
                fontWeight: 700
            },
            hamburger: {
                width: 50,
                height: 30
            },
            brand: {
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 24
            },
            role: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            avatar: {
                backgroundColor: theme.palette.primary.light,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: theme.palette.secondary.light,
                width: 30,
                height: 30
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
        <Toolbar>
            <Grid container={true} justify="flex-start" alignItems="center">
                <Grid item={true} xs={2}>
                    <Menu
                        onClick={handleDrawerOpen}
                        className={classes.hamburger}
                        color="secondary"
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.brand} variant="text">SR GH</Button>
                    </Link>
                </Grid>

                {isSignedIn ? (
                    <Grid xs={4} spacing={2} alignItems="center" item={true} container={true} justify="space-around">
                        <Grid item={true}>
                            {loading && <CircularProgress variant="indeterminate"/>}
                            <Avatar className={classes.avatar} variant="circular">
                                <Typography className={classes.name} variant="h6">{profile.name[0]}</Typography>
                            </Avatar>
                        </Grid>
                        <Grid item={true}>
                            <ExitToApp
                                onClick={() => dispatch(logout(token))}
                                className={classes.button}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container={true} justify="flex-start"  item={true}>
                        <Link className={classes.link} to="/auth/login">
                            <Button className={classes.button} variant="text" size="large">Login</Button>
                        </Link>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;