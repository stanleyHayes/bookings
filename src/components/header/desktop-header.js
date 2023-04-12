import React from "react";
import {Avatar, Button, CardMedia, CircularProgress, Stack, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {useLocation} from "react-router";
import logo from "./../../assets/images/logo.png";

const DesktopHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, loading, user} = useSelector(selectAuth);

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    const {pathname} = useLocation();

    return (
        <Toolbar variant="regular">
            <Stack
                sx={{width: "100%"}}
                direction="row" justifyContent="space-around" alignItems="center">
                <Link style={{textDecoration: 'none'}} to="/">
                    <CardMedia
                        component="img"
                        src={logo}
                        sx={{width: 100, height: 100, objectFit: "contain"}}
                    />
                </Link>

                <Stack direction="row" spacing={2} alignItems="center">

                    <Link style={{textDecoration: 'none'}} to="/">
                        <Button
                            sx={{
                                color: pathname === '/' ? 'secondary.main' : 'text.secondary',
                                textTransform: 'capitalize'
                            }}
                            variant="text"
                            size="large">Home</Button>
                    </Link>

                    <Link style={{textDecoration: 'none'}} to="/today">
                        <Button sx={{
                            color: pathname === '/today' ? 'secondary.main' : 'text.secondary',
                            textTransform: 'capitalize'
                        }} fullWidth={true}
                                variant="text" size="large">
                            Today's Bookings
                        </Button>
                    </Link>

                    <Link style={{textDecoration: 'none'}} to="/bookings">
                        <Button sx={{
                            color: pathname === '/bookings' ? 'secondary.main' : 'text.secondary',
                            textTransform: 'capitalize'
                        }} variant="text" size="large">Bookings</Button>
                    </Link>

                    <Link style={{textDecoration: 'none'}} to="/new/booking">
                        <Button sx={{
                            color: pathname === '/new/booking' ? 'secondary.main' : 'text.secondary',
                            textTransform: 'capitalize'
                        }} variant="text" size="large">Create</Button>
                    </Link>

                    {user && user.role === 'ADMIN' && (
                        <Link style={{textDecoration: 'none'}} to="/invitations">
                            <Button
                                sx={{
                                    color: pathname === '/invitations' ? 'secondary.main' : 'text.secondary',
                                    textTransform: 'capitalize'
                                }}
                                variant="text" size="large">Invitations</Button>
                        </Link>
                    )}
                </Stack>

                {user && (
                    <Stack direction="row" spacing={2} alignItems="center">

                        {loading && <CircularProgress variant="indeterminate"/>}
                        <Link style={{textDecoration: 'none'}} to="/account">
                            <Avatar sx={{backgroundColor: 'light.secondary'}} variant="circular">
                                <Typography
                                    sx={{color: 'secondary.main'}}
                                    variant="h4">{user.name[0]}</Typography>
                            </Avatar>
                        </Link>

                        <Button
                            color="secondary"
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                                textTransform: 'capitalize'
                            }}
                            onClick={handleLogoutClick}
                            variant="contained"
                            disableElevation={true}
                            disabled={loading}
                            size="large">
                            Logout
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Toolbar>
    )
}

export default DesktopHeader;
