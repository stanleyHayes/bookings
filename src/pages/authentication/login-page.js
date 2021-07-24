import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {Alert} from "@material-ui/lab";
import {signIn} from "../../redux/authentication/auth-action-creators";
import {useSnackbar} from "notistack";

const LoginPage = () => {

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
                textTransform: "uppercase",
                marginBottom: 16
            },
            link: {
                textDecoration: 'none'
            },
            forgotPasswordButton: {
                marginTop: 16,
                marginBottom: 16
            },
        }
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const { enqueueSnackbar} = useSnackbar();

    const {token, loading, error: authError} = useSelector(selectAuth);

    useEffect(() => {
        if (!loading && token) {
            history.push('/');
        }
    }, [history, loading, token]);

    const [user, setUser] = useState({});
    const {email, password} = user;
    const [error, setError] = useState({});
    const [visible, setVisible] = useState(false);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleUserSubmit = e => {
        e.preventDefault();
        if (!email) {
            setError({...error, email: "Field required"});
            return;
        } else {
            setError({...error, email: null});
        }

        if (!password) {
            setError({...error, password: "Field required"});
            return;
        } else {
            setError({...error, password: null});
        }
        dispatch(signIn(user, history, showNotification));
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Divider variant="fullWidth" light={true} className={classes.divider}/>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="outlined" elevation={1}>
                            {loading && <LinearProgress color="secondary" variant="query"/>}
                            <CardContent>
                                <Typography
                                    className={classes.title}
                                    color="textPrimary"
                                    variant="h4"
                                    align="center">
                                    Sign In
                                </Typography>
                                {authError &&
                                <Alert variant="filled" title={authError} severity="error">{authError}</Alert>}

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleUserChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Email"
                                    placeholder="Enter email"
                                    required={true}
                                    error={Boolean(error.email)}
                                    helperText={error.email}
                                />

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleUserChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Password"
                                    placeholder="Enter password"
                                    required={true}
                                    error={Boolean(error.password)}
                                    helperText={error.password}
                                />

                                <Grid container={true} alignItems="center">
                                    <Grid item={true}>
                                        <Switch
                                            checked={visible}
                                            onChange={handlePasswordVisibility}
                                            size="medium"/>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">
                                            {visible ? "Hide Password" : "Show Password"}
                                        </Typography>
                                    </Grid>
                                </Grid>


                                <Link className={classes.link} to="/auth/forgot-password">
                                    <Button fullWidth={true} className={classes.button}>
                                        Forgot Password
                                    </Button>
                                </Link>

                                <Button
                                    className={classes.button}
                                    onClick={handleUserSubmit}
                                    variant="outlined"
                                    fullWidth={true}
                                    size="large"
                                    disableElevation={true}>
                                    Sign In
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LoginPage;