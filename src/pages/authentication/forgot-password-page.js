import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {Link, useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {forgotPassword} from "../../redux/authentication/auth-action-creators";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(forgotPassword(email, navigate, showNotification))
    }


    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Container>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card
                            sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 32,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 0
                            }}
                            variant="elevation"
                            elevation={1}>
                            {loading && <LinearProgress color="secondary" variant="query"/>}
                            <CardContent>
                                <Stack direction="column" spacing={3}>
                                    <Typography
                                        sx={{color: 'text.primary'}}
                                        variant="h3"
                                        align="center">
                                        Forgot Password
                                    </Typography>
                                    {authError &&
                                        <Alert
                                            variant="filled"
                                            title={authError}
                                            severity="error">
                                            <AlertTitle>
                                                {authError}
                                            </AlertTitle>
                                        </Alert>}

                                    <Typography
                                        sx={{color: 'text.secondary'}}
                                        gutterBottom={true}
                                        variant="body2"
                                        align="center">
                                        Enter the email address associated with your account and we'll send you a link
                                        to
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
                                        label="Email"
                                        placeholder="Enter email"
                                        required={true}
                                        error={Boolean(error.email)}
                                        helperText={error.email}
                                    />

                                    <Button
                                        onClick={handlePasswordReset}
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            textTransform: 'capitalize',
                                            py: 1.2,
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0
                                        }}
                                        fullWidth={true}
                                        size="large"
                                        disableElevation={true}>
                                        Reset Password
                                    </Button>

                                    <Link style={{textDecoration: 'none'}} to="/auth/login">
                                        <Button
                                            startIcon={<KeyboardArrowLeft/>}
                                            variant="text"
                                            color="secondary"
                                            sx={{textTransform: 'capitalize'}}
                                            fullWidth={true}>
                                            Back to login
                                        </Button>
                                    </Link>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    )
}

export default ForgotPasswordPage;
