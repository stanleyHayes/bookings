import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";


const DrawerContent = ({handleDrawerClose}) => {

    const {token, user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Box sx={{py: 4}}>
            <Container>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} container={true} justifyContent="flex-end">
                        <Grid item={true}>
                            <Button
                                sx={{
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderTopLeftRadius: 0,
                                    mb: 4,
                                    textTransform: 'capitalize'
                                }}
                                color="secondary"
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

                <Divider light={true} sx={{my: 3}} variant="fullWidth"/>

                <Grid container={true} direction="column">
                    <Grid item={true} xs={12}>
                        <Stack divider={<Divider variant="fullWidth" light={true}/>} spacing={1}>
                            <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/">
                                <Button sx={{textTransform: 'capitalize'}} color="secondary" variant="text"
                                        size="large">
                                    Home
                                </Button>
                            </Link>


                            <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/today">
                                <Button sx={{textTransform: 'capitalize'}} color="secondary" variant="text"
                                        size="large">
                                    Today's Bookings
                                </Button>
                            </Link>


                            <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/bookings">
                                <Button sx={{textTransform: 'capitalize'}} color="secondary" variant="text"
                                        size="large">
                                    Bookings
                                </Button>
                            </Link>


                            <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/new/booking">
                                <Button sx={{textTransform: 'capitalize'}} color="secondary" variant="text"
                                        size="large">
                                    Create
                                </Button>
                            </Link>


                            <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/account">
                                <Button sx={{textTransform: 'capitalize'}} color="secondary" variant="text"
                                        size="large">
                                    Account
                                </Button>
                            </Link>

                            {user && user.role === 'ADMIN' && (
                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/invitations">
                                        <Button sx={{textTransform: 'capitalize'}}
                                                color="secondary"
                                            variant="text" size="large">Invitations</Button>
                                    </Link>
                            )}

                            <Button
                                sx={{
                                    textTransform: 'capitalize',
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderTopLeftRadius: 0,
                                }}
                                color="secondary"
                                disableElevation={true}
                                onClick={handleLogoutClick}
                                variant="contained" size="large">
                                Logout
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default DrawerContent;
