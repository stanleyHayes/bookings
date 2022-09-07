import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {Avatar, Grid, Toolbar, Typography} from "@mui/material";
import {ExitToApp, Menu} from "@mui/icons-material";

const MobileHeader = ({handleDrawerOpen}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, user} = useSelector(selectAuth);

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Toolbar>
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid item={true} xs={2}>
                    <Menu
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderTopLeftRadius: 0,
                            backgroundColor: 'light.secondary',
                            color: 'secondary.main',
                            fontSize: 32,
                            padding: 0.4
                        }}
                        onClick={handleDrawerOpen}/>
                </Grid>

                <Grid item={true} xs={6}>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <Typography
                            sx={{color: 'text.primary'}}
                            variant="h5">
                            SR GH
                        </Typography>
                    </Link>
                </Grid>

                {user && (
                    <Grid xs={4} alignItems="center" item={true}>
                        <Grid spacing={2} alignItems="center" item={true} container={true}>
                            <Grid item={true}>
                                <Avatar
                                    sx={{
                                        color: 'secondary.main',
                                        backgroundColor: 'light.secondary',
                                        borderBottomRightRadius: 0,
                                        borderTopRightRadius: 12,
                                        borderBottomLeftRadius: 12,
                                        borderTopLeftRadius: 0,
                                    }}
                                    variant="circular">
                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="h6">
                                        {user.name[0]}</Typography>
                                </Avatar>
                            </Grid>
                            <Grid item={true}>
                                <ExitToApp
                                    sx={{
                                        borderBottomRightRadius: 0,
                                        borderTopRightRadius: 12,
                                        borderBottomLeftRadius: 12,
                                        borderTopLeftRadius: 0,
                                        backgroundColor: 'light.secondary',
                                        color: 'secondary.main',
                                        fontSize: 32,
                                        padding: 0.4
                                    }}
                                    onClick={handleLogoutClick}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;
