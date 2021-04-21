import React from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";


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

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">
                    Account Information
                </Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

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

                                <Typography color="textSecondary" gutterBottom={true} variant="h4">
                                    Stanley Hayford
                                </Typography>

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                                <Typography color="textSecondary" variant="caption"
                                            gutterBottom={true}>Position</Typography>
                                <Typography color="textSecondary" variant="h6">Assistant Director</Typography>

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>
                                <Typography color="textSecondary" variant="caption"
                                            gutterBottom={true}>Department</Typography>
                                <Typography color="textSecondary" variant="body1">IT Department</Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container={true} justify="center" className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Link to="/auth/change-password" className={classes.link}>
                                    <Button className={classes.button} variant="outlined" size="large" fullWidth={true}>
                                        Change Password
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth" className={classes.subDivider} light={true}/>

                                <Button className={classes.button} variant="outlined" size="large" fullWidth={true}>
                                    Logout
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