import React from "react";
import {Avatar, Button, CircularProgress, Grid, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {useLocation} from "react-router";

const DesktopHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, loading, user} = useSelector(selectAuth);

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    const {pathname} = useLocation();

    return (
        <Toolbar variant="regular" color="primary">
            <Grid container={true} justifyContent="space-around" alignItems="center">
                <Grid lg={4} item={true}>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <Typography sx={{color: 'text.primary'}} variant="h6">
                            Streamline Resources Ghana
                        </Typography>
                    </Link>
                </Grid>

                <Grid lg={6} item={true} container={true} justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item={true}>
                        <Link style={{textDecoration: 'none'}} to="/">
                            <Button
                                sx={{
                                    color: pathname === '/' ? 'text.primary' : 'text.secondary',
                                    textTransform: 'capitalize'
                                }}
                                variant="text"
                                size="large">Home</Button>
                        </Link>
                    </Grid>

                    <Grid item={true}>
                        <Link style={{textDecoration: 'none'}} to="/today">
                            <Button sx={{
                                color: pathname === '/today' ? 'text.primary' : 'text.secondary',
                                textTransform: 'capitalize'
                            }} fullWidth={true}
                                    variant="text" size="large">
                                Today's Bookings
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item={true}>
                        <Link style={{textDecoration: 'none'}} to="/bookings">
                            <Button sx={{
                                color: pathname === '/bookings' ? 'text.primary' : 'text.secondary',
                                textTransform: 'capitalize'
                            }} variant="text" size="large">Bookings</Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Link style={{textDecoration: 'none'}} to="/new/booking">
                            <Button sx={{
                                color: pathname === '/new/booking' ? 'text.primary' : 'text.secondary',
                                textTransform: 'capitalize'
                            }} variant="text" size="large">Create</Button>
                        </Link>
                    </Grid>
                    {user && user.role === 'ADMIN' && (
                        <Grid item={true}>
                            <Link style={{textDecoration: 'none'}} to="/invitations">
                                <Button
                                    sx={{
                                        color: pathname === '/invitations' ? 'text.primary' : 'text.secondary',
                                        textTransform: 'capitalize'
                                    }}
                                    variant="text" size="large">Invitations</Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>

                {user && (
                    <Grid spacing={2} alignItems="center" item={true} lg={2} container={true} justify="flex-start">
                        <Grid item={true}>
                            {loading && <CircularProgress variant="indeterminate"/>}
                            <Link style={{textDecoration: 'none'}} to="/account">
                                <Avatar sx={{backgroundColor:'light.secondary'}} variant="circular">
                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="h4">{user.name[0]}</Typography>
                                </Avatar>
                            </Link>
                        </Grid>
                        <Grid item={true}>
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
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;
