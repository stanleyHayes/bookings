import React from "react";
import Layout from "../../components/layout";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {Button, Card, CardContent, Container, Divider, Grid, LinearProgress, Skeleton, Typography} from "@mui/material";
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
                <Typography color="textPrimary" variant="h3" align="center">
                    Account Information
                </Typography>

                <Divider variant="fullWidth"/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="outlined" elevation={1}>
                            <CardContent>
                                <Typography
                                    color="textPrimary"
                                    variant="caption"
                                    gutterBottom={true}>
                                    Name
                                </Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textPrimary" gutterBottom={true} variant="h4">
                                        {user.name}
                                    </Typography>
                                }

                                <Divider variant="fullWidth"/>

                                <Typography color="textPrimary" variant="caption"
                                            gutterBottom={true}>Position</Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textPrimary" gutterBottom={true} variant="h6">
                                        {user.position}
                                    </Typography>
                                }
                                <Divider variant="fullWidth"/>
                                <Typography color="textPrimary" variant="caption"
                                            gutterBottom={true}>Department</Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textPrimary" gutterBottom={true} variant="h6">
                                        {user.department}
                                    </Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="outlined" elevation={1}>
                            <CardContent>
                                <Link to="/auth/update-profile">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth={true}>
                                        Update Profile
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth"/>

                                <Link to="/auth/change-password">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth={true}>
                                        Change Password
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth" />

                                <Button
                                    onClick={handleLogoutClick}
                                    variant="outlined"
                                    size="large"
                                    fullWidth={true}>
                                    Logout
                                </Button>

                                <Divider variant="fullWidth" />

                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth={true}>
                                    Logout all devices
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default AccountPage;
