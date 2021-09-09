import React, {useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {Link, useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {forgotPassword} from "../../redux/authentication/auth-action-creators";
import {Alert} from "@material-ui/lab";


const ForgotPasswordPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32,
                paddingBottom: 32
            },
            root: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default
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
            },
            instruction: {
                marginTop: 16,
                marginBottom: 16
            },
            link: {
                textDecoration: 'none'
            }
        }
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }


    const {loading, error: authError} = useSelector(selectAuth);

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
        dispatch(forgotPassword(email, history, showNotification))
    }


    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="outlined" elevation={1}>
                            {loading && <LinearProgress color="secondary" variant="query"/>}
                            <CardContent>
                                <Typography color="textPrimary" variant="h3" align="center">Forgot Password</Typography>
                                {authError &&
                                <Alert variant="filled" title={authError} severity="error">{authError}</Alert>}

                                <Typography className={classes.instruction} gutterBottom={true} variant="body2"
                                            align="center">
                                    Enter the email address associated with your account and we'll send you a link to
                                    reset your password
                                </Typography>

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
                                    variant="outlined"
                                    fullWidth={true}
                                    size="large"
                                    disableElevation={true}>
                                    Reset Password
                                </Button>

                                <Link className={classes.link} to="/auth/login">
                                    <Button fullWidth={true} className={classes.button}>
                                       Back to login
                                    </Button>
                                </Link>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default ForgotPasswordPage;