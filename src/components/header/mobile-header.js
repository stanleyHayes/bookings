import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {Avatar, CardMedia, Stack, Toolbar, Typography} from "@mui/material";
import {ExitToApp, Menu} from "@mui/icons-material";
import logo from "./../../assets/images/logo.png";

const MobileHeader = ({handleDrawerOpen}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, user} = useSelector(selectAuth);

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Toolbar variant="regular">
            <Stack sx={{width: "100%"}} direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
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
                    <Link style={{textDecoration: 'none'}} to="/">
                        <CardMedia
                            component="img"
                            src={logo}
                            sx={{width: 30, height: 30, objectFit: "contain"}}
                        />
                    </Link>
                </Stack>
                {user && (
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                color: 'secondary.main',
                                backgroundColor: 'light.secondary',
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                                width: 35, height: 35
                            }}
                            variant="circular">
                            <Typography
                                sx={{color: 'secondary.main'}}
                                variant="h6">
                                {user.name[0]}</Typography>
                        </Avatar>

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
                    </Stack>
                )}
            </Stack>
        </Toolbar>
    )
}

export default MobileHeader;
