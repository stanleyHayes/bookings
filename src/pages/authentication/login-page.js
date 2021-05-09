import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid, LinearProgress,
    makeStyles,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {login, selectError, selectIsSignedIn, selectLoading} from "../../app/features/authentication/auth-slice";
import {useHistory} from "react-router-dom";

const LoginPage = () => {

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

    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector(selectLoading);
    const err = useSelector(selectError);
    const isSignedIn = useSelector(selectIsSignedIn);

    useEffect(() => {
        if(isSignedIn){
            history.push('/');
        }
    },[history, isSignedIn]);

    const [user, setUser] = useState({});
    const {email, password} = user;
    const [error, setError] = useState({});
    const [visible, setVisible] = useState(false);

    const handleUserChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
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
        dispatch(login({...user, history}));
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">Sign In</Typography>

                <Divider variant="fullWidth" light={true} className={classes.divider}/>
                {loading ? <LinearProgress color="secondary" variant="query"/> : err ? (
                    <Typography color="error" variant="h6">{err}</Typography>
                ) : null}

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
        </Layout>
    )
}

export default LoginPage;