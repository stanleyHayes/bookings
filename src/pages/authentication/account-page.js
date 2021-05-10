import React from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid, LinearProgress,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectLoading, selectProfile, logout, selectToken} from "../../app/features/authentication/auth-slice";
import {Skeleton} from "@material-ui/lab";


const AccountPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            subDivider: {
                marginTop: 8,
                marginBottom: 8
            },
            textField: {
                background: "#efefefef",
                marginBottom: 8,
                marginTop: 8
            },
            button: {
                paddingTop: 16,
                paddingBottom: 16,
                marginTop: 16,
                marginBottom: 16
            },
            title: {
                textTransform: "uppercase"
            },
            link: {
                textDecoration: "none"
            },
            gridContainer: {
                marginTop: 32
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const profile = useSelector(selectProfile);
    const loading = useSelector(selectLoading);
    const token = useSelector(selectToken);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress color="secondary" variant="query" /> }
                <Typography color="textPrimary" variant="h3" align="center">
                    Account Information
                </Typography>

                <Divider light={true} variant="fullWidth" className={classes.divider}/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>

                                <Typography
                                    color="textSecondary"
                                    variant="caption"
                                    gutterBottom={true}>
                                    Name
                                </Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textSecondary" gutterBottom={true} variant="h4">
                                        {profile.name}
                                    </Typography>
                                }

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                                <Typography color="textSecondary" variant="caption"
                                            gutterBottom={true}>Position</Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textSecondary" gutterBottom={true} variant="h6">
                                        {profile.position}
                                    </Typography>
                                }
                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>
                                <Typography color="textSecondary" variant="caption"
                                            gutterBottom={true}>Department</Typography>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    <Typography color="textSecondary" gutterBottom={true} variant="h6">
                                        {profile.department}
                                    </Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container={true} justify="center" className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Link to="/auth/change-password" className={classes.link}>
                                    <Button
                                        className={classes.button}
                                        variant="outlined"
                                        size="large"
                                        fullWidth={true}>
                                        Change Password
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                                <Button
                                    onClick={() => dispatch(logout({token}))}
                                    className={classes.button}
                                    variant="outlined"
                                    size="large"
                                    fullWidth={true}>
                                    Logout
                                </Button>

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                                <Button
                                    className={classes.button}
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