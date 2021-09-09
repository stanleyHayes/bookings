import {Avatar, Button, CircularProgress, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {Link, useHistory} from "react-router-dom";
import {ExitToApp, Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {grey} from "@material-ui/core/colors";

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
                borderColor: grey['100'],
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
    const history = useHistory();

    const {token, user, loading} = useSelector(selectAuth);
    const handleLogoutClick = () => {
        dispatch(signOut(token, history));
    }

    return (
        <Toolbar>
            <Grid container={true} justify="flex-start" alignItems="center">
                <Grid item={true} xs={2}>
                    <Menu
                        onClick={handleDrawerOpen}
                        className={classes.hamburger}
                    />
                </Grid>
                <Grid item={true} xs={6}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.brand} variant="text">SR GH</Button>
                    </Link>
                </Grid>

                {user && (
                    <Grid xs={4} spacing={2} alignItems="center" item={true} container={true} justify="space-around">
                        <Grid item={true}>
                            {loading && <CircularProgress variant="indeterminate"/>}
                            <Avatar className={classes.avatar} variant="circular">
                                <Typography className={classes.name} variant="h6">{user.name[0]}</Typography>
                            </Avatar>
                        </Grid>
                        <Grid item={true}>
                            <ExitToApp
                                onClick={handleLogoutClick}
                                className={classes.button}
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;