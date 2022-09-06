import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Divider, Grid, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";


const DrawerContent = ({handleDrawerClose}) => {

    const {token} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Container>
            <Grid container={true} justify="center">
                <Grid container={true} justify="flex-end">
                    <Grid item={true}>
                        <Button
                            onClick={handleDrawerClose}
                            startIcon={<Close/>}
                            variant="outlined"
                            size="large">
                            Close
                        </Button>
                    </Grid>
                </Grid>
                <Grid item={true}>
                    <Typography
                        gutterBottom={true}
                        variant="h4"
                        align="center">
                        Streamline Resources GH
                    </Typography>
                    <Divider variant="middle" light={true}/>
                    <Typography
                        gutterBottom={true}
                        variant="h6"
                        align="center">
                        GRA Affixing Facility
                    </Typography>
                </Grid>
            </Grid>

            <Divider variant="fullWidth"/>

            <Grid>
                <Grid item={true} xs={12}>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <Button fullWidth={true} variant="text" size="large">
                            Home
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" light={true}/>

                    <Link style={{textDecoration: 'none'}} to="/today">
                        <Button fullWidth={true} variant="text" size="large">
                            Today's Bookings
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" light={true}/>

                    <Link style={{textDecoration: 'none'}} to="/bookings">
                        <Button fullWidth={true} variant="text" size="large">
                            Bookings
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" light={true}/>

                    <Link style={{textDecoration: 'none'}} to="/new/booking">
                        <Button fullWidth={true} variant="text" size="large">
                            Create
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" light={true}/>

                    <Link style={{textDecoration: 'none'}} to="/account">
                        <Button fullWidth={true} variant="text" size="large">
                            Account
                        </Button>
                    </Link>

                    <Divider variant="fullWidth" light={true}/>

                    <Button onClick={handleLogoutClick} fullWidth={true} variant="text" size="large">
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DrawerContent;
