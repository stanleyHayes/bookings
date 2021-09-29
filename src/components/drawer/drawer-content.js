import React from "react";
import {Avatar, Button, Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {Close} from "@material-ui/icons";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useDispatch, useSelector} from "react-redux";


const DrawerContent = ({handleDrawerClose}) => {

    const useStyles = makeStyles(() => {
        return {
            link: {
                textDecoration: "none"
            },
            button: {},
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            avatar: {
                width: 150,
                height: 150,
                borderWidth: 2,
                borderStyle: "solid",
                padding: 8
            },
            name: {},
            nickname: {},
            role: {
                fontWeight: "bold"
            },
            subDivider: {
                marginTop: 8,
                marginBottom: 8
            },
            container: {
                paddingTop: 32,
                paddingBottom: 32
            },
            closeButton: {}
        }
    });

    const classes = useStyles();

    const {token} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogoutClick = () => {
        dispatch(signOut(token, history));
    }
    return (
        <Container className={classes.container}>
            <Grid container={true} justify="center">
                <Grid container={true} justify="flex-end">
                    <Grid item={true}>
                        <Button
                            className={classes.closeButton}
                            onClick={handleDrawerClose}
                            startIcon={<Close/>}
                            variant="outlined"
                            size="large">
                            Close
                        </Button>
                    </Grid>
                </Grid>
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Avatar src="/assets/lightingcolored.svg" className={classes.avatar}/>
                    </Grid>
                </Grid>
                <Grid item={true}>
                    <Typography
                        gutterBottom={true}
                        className={classes.name}
                        variant="h4"
                        align="center">
                        Streamline Resources GH
                    </Typography>
                    <Divider variant="middle" className={classes.subDivider} light={true}/>
                    <Typography
                        gutterBottom={true}
                        className={classes.nickname}
                        variant="h6"
                        align="center">
                        GRA Affixing Facility
                    </Typography>
                </Grid>
            </Grid>

            <Divider variant="fullWidth" className={classes.divider}/>

            <Grid>
                <Grid item={true} xs={12}>
                    <Link to="/" className={classes.link}>
                        <Button fullWidth={true} variant="text" size="large">
                            Home
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                    <Link to="/today" className={classes.link}>
                        <Button fullWidth={true} variant="text" size="large">
                            Today's Bookings
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                    <Link to="/bookings" className={classes.link}>
                        <Button fullWidth={true} variant="text" size="large">
                            Bookings
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                    <Link to="/new/booking" className={classes.link}>
                        <Button fullWidth={true} variant="text" size="large">
                            Create
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                    <Link to="/account" className={classes.link}>
                        <Button fullWidth={true} variant="text" size="large">
                            Account
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                    <Button onClick={handleLogoutClick} fullWidth={true} variant="text" size="large">
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DrawerContent;