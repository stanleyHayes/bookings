import React from "react";
import Layout from "../../components/layout";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router";


const AccountPage = () => {


    const {loading, user, token} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(signOut(token, navigate));
    }

    return (
        <Layout>
            <Container>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                <Typography sx={{color: 'text.primary'}} variant="h4" align="center">
                    Account Information
                </Typography>

                <Divider sx={{my: 3}} variant="fullWidth"/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 32,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 0,
                            }} variant="elevation" elevation={1}>
                            <CardContent>
                                <Stack divider={<Divider variant="fullWidth" light={true}/>} spacing={2}>
                                    <Box>
                                        <Typography
                                            sx={{color: 'text.secondary'}}
                                            variant="caption"
                                            gutterBottom={true}>
                                            Name
                                        </Typography>
                                        {loading ? <Skeleton variant="text" animation="wave"/> :
                                            <Typography
                                                sx={{color: 'text.primary'}}
                                                gutterBottom={true} variant="h6">
                                                {user.name}
                                            </Typography>
                                        }
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{color: 'text.secondary'}}
                                            variant="body2"
                                            gutterBottom={true}>Position</Typography>
                                        {loading ? <Skeleton variant="text" animation="wave"/> :
                                            <Typography sx={{color: 'text.primary'}} gutterBottom={true} variant="h6">
                                                {user.position}
                                            </Typography>
                                        }
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{color: 'text.secondary'}}
                                            variant="body2"
                                            gutterBottom={true}>
                                            Department
                                        </Typography>
                                        {loading ? <Skeleton variant="text" animation="wave"/> :
                                            <Typography
                                                sx={{color: 'text.primary'}}
                                                gutterBottom={true} variant="h6">
                                                {user.department}
                                            </Typography>
                                        }
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{my: 3}} variant="fullWidth"/>

                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 32,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 0,
                        }} variant="elevation" elevation={1}>
                            <CardContent>
                                <Stack divider={<Divider variant="fullWidth" light={true}/>} spacing={3}>

                                    <Link style={{textDecoration: 'none'}} to="/auth/update-profile">
                                        <Button
                                            sx={{
                                                borderBottomRightRadius: 0,
                                                borderTopRightRadius: 12,
                                                borderBottomLeftRadius: 12,
                                                borderTopLeftRadius: 0,
                                                textTransform: 'capitalize'
                                            }}
                                            color="secondary"
                                            variant="outlined"
                                            size="large"
                                            fullWidth={true}>
                                            Update Profile
                                        </Button>
                                    </Link>

                                    <Link style={{textDecoration: 'none'}} to="/auth/change-password">
                                        <Button
                                            sx={{
                                                borderBottomRightRadius: 0,
                                                borderTopRightRadius: 12,
                                                borderBottomLeftRadius: 12,
                                                borderTopLeftRadius: 0,
                                                textTransform: 'capitalize'
                                            }}
                                            color="secondary"
                                            variant="outlined"
                                            size="large"
                                            fullWidth={true}>
                                            Change Password
                                        </Button>
                                    </Link>

                                    <Button
                                        sx={{
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                            textTransform: 'capitalize'
                                        }}
                                        color="secondary"
                                        onClick={handleLogoutClick}
                                        variant="outlined"
                                        size="large"
                                        fullWidth={true}>
                                        Logout
                                    </Button>

                                    <Button
                                        sx={{
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                            textTransform: 'capitalize'
                                        }}
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        fullWidth={true}>
                                        Logout all devices
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default AccountPage;
