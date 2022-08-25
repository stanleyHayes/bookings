import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    LinearProgress,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import loginLogo from "./../../assets/images/sign-up.png";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link, useHistory} from "react-router-dom";
import {
    CallOutlined,
    KeyboardArrowLeft,
    MailOutline,
    PersonOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined
} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {signUp} from "../../redux/authentication/auth-action-creators";

const RegisterPage = () => {

    const dispatch = useDispatch();

    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            department: '',
            gender: 'male',
            password: '',
            phoneNumber: '',
            confirmPassword: '',
            email: ''
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(signUp({values, history, resetForm, setSubmitting, showMessage}));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            firstName: yup.string().required('First name required'),
            lastName: yup.string().required('Last name required'),
            username: yup.string().required('username required'),
            gender: yup.string().oneOf(['male', 'female'], 'choose valid gender').required('gender required'),
            email: yup.string().email('Invalid email').required('username required'),
            password: yup.string().required('Password required'),
            confirmPassword: yup.string()
                .required('confirm password required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            phoneNumber: yup.string().phone('Enter valid phone number').required('Phone number required')
        })
    });

    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();

    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
            }}>
            <Box
                sx={{
                    display: {xs: 'none', lg: 'block'},
                    overflow: 'hidden',
                    maxHeight: '100vh',
                    backgroundColor: 'background.default'
                }}>
                <Stack justifyContent="center" alignItems="center" sx={{height: '100%'}}>
                    <img
                        style={{
                            maxHeight: '100vh',
                            width: '50%',
                            height: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        alt=""
                        src={loginLogo}
                    />
                </Stack>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    overflowY: 'scroll',
                    paddingY: 4,
                }}>
                {authLoading && <LinearProgress variant="query" color="secondary"/>}
                <Container maxWidth="md">
                    <Box sx={{alignItems: "center", display: 'flex'}} flexGrow={1}>
                        <form
                            style={{width: '100%'}}
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}>
                            <Box>
                                {authError && (
                                    <Alert severity="error">
                                        <AlertTitle>{authError}</AlertTitle>
                                    </Alert>
                                )}

                                {authMessage && (
                                    <Alert severity="error">
                                        <AlertTitle>{authMessage}</AlertTitle>
                                    </Alert>
                                )}

                                <Box mb={2}>
                                    <Button
                                        color="secondary"
                                        size="large"
                                        sx={{textTransform: 'capitalize'}}
                                        onClick={history.go}
                                        variant="text"
                                        startIcon={<KeyboardArrowLeft/>}>
                                        Back
                                    </Button>
                                </Box>

                                <Stack mb={2} direction="row" spacing={1}>
                                    <Typography variant="h5" sx={{color: 'secondary.main'}}>
                                        Sign
                                    </Typography>
                                    <Typography variant="h5" sx={{color: 'text.primary'}}>
                                        Up
                                    </Typography>
                                </Stack>

                                <Typography variant="h4" sx={{color: 'secondary.main', mb: 2}}>
                                    Streaming Resource GH
                                </Typography>


                                <Stack mb={2} direction="row" spacing={2} alignItems="center">
                                    <Typography
                                        variant="body2"
                                        sx={{color: 'text.secondary', fontWeight: 500}}>
                                        Already have an account?
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{color: 'text.secondary', fontWeight: 500}}>
                                        <Link
                                            style={{
                                                color: theme.palette.secondary.main,
                                                textDecoration: 'none'
                                            }}
                                            to="/auth/login">
                                            Sign In
                                        </Link>
                                    </Typography>
                                </Stack>

                                <Grid mb={2} container={true} spacing={2} alignItems="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Box>
                                            <Typography
                                                mb={1}
                                                variant="body2"
                                                sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                First Name
                                            </Typography>
                                            <FormControl fullWidth={true} variant="outlined">
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    id="firstName"
                                                    value={formik.values.firstName}
                                                    name="firstName"
                                                    endAdornment={
                                                        <InputAdornment
                                                            position="end">
                                                            <PersonOutlined
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    color: 'secondary.main',
                                                                    padding: 1,
                                                                    fontSize: 36,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    }
                                                    error={formik.touched.firstName && formik.errors.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter first name"
                                                    required={true}
                                                    size="medium"
                                                    margin="dense"
                                                />
                                                {formik.touched.firstName && formik.errors.firstName && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.firstName}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Grid>

                                    <Grid item={true} xs={12} md={6}>
                                        <Box>
                                            <Typography
                                                mb={1} variant="body2"
                                                sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                Last Name
                                            </Typography>
                                            <FormControl fullWidth={true} variant="outlined">
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    id="lastName"
                                                    value={formik.values.lastName}
                                                    name="lastName"
                                                    endAdornment={
                                                        <InputAdornment
                                                            position="end">
                                                            <PersonOutlined
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    color: 'secondary.main',
                                                                    padding: 1,
                                                                    fontSize: 36,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    }
                                                    error={formik.touched.lastName && formik.errors.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter last name"
                                                    required={true}
                                                    size="medium"
                                                    margin="dense"
                                                />
                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.lastName}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid mb={2} container={true} spacing={2} alignItems="center">
                                    <Box>
                                        <Typography
                                            mb={1}
                                            variant="body2"
                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                            Email
                                        </Typography>
                                        <FormControl fullWidth={true} variant="outlined">
                                            <OutlinedInput
                                                fullWidth={true}
                                                id="email"
                                                value={formik.values.email}
                                                name="email"
                                                endAdornment={
                                                    <InputAdornment
                                                        position="end">
                                                        <MailOutline
                                                            sx={{
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                padding: 1,
                                                                fontSize: 36,
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                }
                                                error={formik.touched.email && formik.errors.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter email"
                                                required={true}
                                                size="medium"
                                                margin="dense"
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.email}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid mb={2} container={true} spacing={2} alignItems="center">
                                    <Box>
                                        <Typography
                                            mb={1}
                                            variant="body2"
                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                            Phone
                                        </Typography>
                                        <FormControl fullWidth={true} variant="outlined">
                                            <OutlinedInput
                                                fullWidth={true}
                                                id="phoneNumber"
                                                value={formik.values.phoneNumber}
                                                name="phoneNumber"
                                                endAdornment={
                                                    <InputAdornment
                                                        position="end">
                                                        <CallOutlined
                                                            sx={{
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                padding: 1,
                                                                fontSize: 36,
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                }
                                                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter phone"
                                                required={true}
                                                size="medium"
                                                margin="dense"
                                            />
                                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.phoneNumber}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid mb={6} container={true} spacing={2} alignItems="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Box>
                                            <Typography
                                                mb={1} variant="body2"
                                                sx={{
                                                    color: 'secondary.main',
                                                    fontWeight: 'bold'
                                                }}>
                                                Password
                                            </Typography>
                                            <FormControl fullWidth={true} variant="outlined">
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    id="password"
                                                    value={formik.values.password}
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment
                                                            position="end">
                                                            {showPassword ?
                                                                <VisibilityOffOutlined
                                                                    onClick={() => setShowPassword(false)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        padding: 1,
                                                                        fontSize: 36,
                                                                    }}
                                                                /> :
                                                                <VisibilityOutlined
                                                                    onClick={() => setShowPassword(true)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        padding: 1,
                                                                        fontSize: 36,
                                                                    }}
                                                                />}
                                                        </InputAdornment>
                                                    }
                                                    error={Boolean(formik.touched.password && formik.errors.password)}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter password"
                                                    required={true}
                                                    size="medium"
                                                    margin="dense"
                                                />
                                                {formik.touched.password && formik.errors.password && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Grid>

                                    <Grid item={true} xs={12} md={6}>
                                        <Box>
                                            <Typography
                                                mb={1} variant="body2"
                                                sx={{
                                                    color: 'secondary.main',
                                                    fontWeight: 'bold'
                                                }}>
                                                Confirm Password
                                            </Typography>
                                            <FormControl fullWidth={true} variant="outlined">
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    id="confirmPassword"
                                                    value={formik.values.confirmPassword}
                                                    name="confirmPassword"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment
                                                            position="end">
                                                            {showPassword ?
                                                                <VisibilityOffOutlined
                                                                    onClick={() => setShowPassword(false)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        padding: 1,
                                                                        fontSize: 36,
                                                                    }}
                                                                /> :
                                                                <VisibilityOutlined
                                                                    onClick={() => setShowPassword(true)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        padding: 1,
                                                                        fontSize: 36,
                                                                    }}
                                                                />}
                                                        </InputAdornment>
                                                    }
                                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter confirm password"
                                                    required={true}
                                                    size="medium"
                                                    margin="dense"
                                                />
                                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.confirmPassword}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <LoadingButton
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    size="large"
                                    color="secondary"
                                    sx={{
                                        textTransform: 'capitalize',
                                        py: 1.2,
                                        borderBottomRightRadius: 4,
                                        borderTopRightRadius: 12,
                                        borderBottomLeftRadius: 12,
                                        borderTopLeftRadius: 4,
                                    }}
                                    fullWidth={false}
                                    loadingPosition="start"
                                    startIcon={authLoading ?
                                        <CircularProgress color="secondary"/> : null}
                                    loadingIndicator={authLoading ?
                                        <CircularProgress color="secondary"/> : null}
                                    loading={authLoading}
                                    variant="contained"
                                    disableElevation={true}>
                                    {authLoading ? 'Creating account...' : 'Create an account'}
                                </LoadingButton>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default RegisterPage;
