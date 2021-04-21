import React, {useState} from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";


const ForgotPasswordPage = () => {

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
                marginTop: 16
            },
            title: {
                textTransform: "uppercase"
            }
        }
    });

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordReset = e => {
        e.preventDefault();
        if (!email) {
            setError({...error, email: "Field required"});
            return;
        } else {
            setError({...error, email: null});
        }
        console.log(email);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">Forgot Password</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Email"
                                    placeholder="Enter email"
                                    required={true}
                                    error={Boolean(error.email)}
                                    helperText={error.email}
                                />

                                <Button
                                    className={classes.button}
                                    onClick={handlePasswordReset}
                                    variant="contained"
                                    fullWidth={true}
                                    size="large"
                                    disableElevation={true}>
                                    Reset Password
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default ForgotPasswordPage;