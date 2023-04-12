import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, CardMedia, Container, Grid, Stack, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import logo from "../../assets/images/logo.png";


const DrawerContent = ({handleDrawerClose}) => {

    const {token, user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Box sx={{py: 4, minWidth: "80vw"}}>
            <Container>
                <Stack spacing={4}>
                    <Box>
                        <Stack spacing={2}>
                            <Box>
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
                            </Box>

                            <Link style={{textDecoration: 'none'}} to="/">
                                <CardMedia
                                    component="img"
                                    src={logo}
                                    sx={{width: 100, height: 100, objectFit: "contain", mb: 2}}
                                />
                            </Link>
                            <Typography
                                variant="h6">
                                GRA Affixing Facility
                            </Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Grid container={true} direction="column">
                            <Grid item={true} xs={12}>
                                <Stack spacing={3}>
                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/">
                                        <Typography
                                            sx={{textTransform: 'capitalize', color: "text.primary"}}
                                            variant="body1"
                                            size="large">
                                            Home
                                        </Typography>
                                    </Link>


                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}} to="/today">
                                        <Typography
                                            sx={{textTransform: 'capitalize', color: "text.primary"}}
                                            variant="body1"
                                            size="large">
                                            Today's Bookings
                                        </Typography>
                                    </Link>


                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}}
                                          to="/bookings">
                                        <Typography
                                            sx={{textTransform: 'capitalize', color: "text.primary"}}
                                            variant="body1"
                                            size="large">
                                            Bookings
                                        </Typography>
                                    </Link>


                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}}
                                          to="/new/booking">
                                        <Typography
                                            sx={{textTransform: 'capitalize', color: "text.primary"}}
                                            variant="body1"
                                            size="large">
                                            Create
                                        </Typography>
                                    </Link>


                                    <Link style={{textDecoration: 'none', width: '100%', display: 'block'}}
                                          to="/account">
                                        <Typography
                                            sx={{textTransform: 'capitalize', color: "text.primary"}}
                                            variant="body1"
                                            size="large">
                                            Account
                                        </Typography>
                                    </Link>

                                    {user && user.role === 'ADMIN' && (
                                        <Link style={{textDecoration: 'none', width: '100%', display: 'block'}}
                                              to="/invitations">
                                            <Typography
                                                sx={{textTransform: 'capitalize', color: "text.primary"}}
                                                variant="body1"
                                                size="large">Invitations</Typography>
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
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default DrawerContent;
