import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signIn} from "../../redux/authentication/auth-action-creators";
import {useSnackbar} from "notistack";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const {loading} = useSelector(selectAuth);

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
        dispatch(signIn(user, navigate, showNotification));
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.default'
        }}>
            <Container>
                <Typography
                    sx={{color: 'text.primary'}}
                    variant="h4"
                    align="center">
                    GH Streaming
                </Typography>
                <Divider sx={{my: 4}} variant="fullWidth" light={true}/>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 32,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 0
                            }} variant="elevation" elevation={1}>
                            {loading && <LinearProgress color="secondary" variant="query"/>}
                            <CardContent>
                                <Stack direction="column" spacing={2}>
                                    <Typography
                                        sx={{color: 'text.primary'}}
                                        variant="h4"
                                        align="center">
                                        Sign In
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleUserChange}
                                        margin="normal"
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
                                        label="Password"
                                        placeholder="Enter password"
                                        required={true}
                                        error={Boolean(error.password)}
                                        helperText={error.password}
                                    />

                                    <Box>
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
                                    </Box>

                                    <Link style={{textDecoration: 'none'}} to="/auth/forgot-password">
                                        <Button
                                            sx={{textTransform: 'capitalize', color: 'secondary.main'}}
                                            variant="text"
                                            fullWidth={true}>
                                            Forgot Password
                                        </Button>
                                    </Link>

                                    <Button
                                        onClick={handleUserSubmit}
                                        variant="contained"
                                        fullWidth={true}
                                        size="large"
                                        color="secondary"
                                        sx={{
                                            textTransform: 'capitalize',
                                            py: 1.2,
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0
                                        }}
                                        disableElevation={true}>
                                        Sign In
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LoginPage;
