import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import {INVITATION_ACTION_CREATORS} from "../../redux/invitations/invitation-action-creators";
import validator from "validator";
import {LoadingButton} from "@mui/lab";

const InvitationForm = ({code, invitationID}) => {

    const [user, setUser] = useState({code});
    const [error, setError] = useState({});

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const {invitationError, invitationLoading} = useSelector(selectInvitations);
    const {email, phone, emergencyPhoneNumber, username, name, password,  image, confirmPassword} = user;

    const handleChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!image) {
            setError({error, image: 'Select image'});
            return;
        } else {
            setError({error, image: null});
        }

        if (!name) {
            setError({error, name: 'Field required'});
            return;
        } else {
            setError({error, name: null});
        }

        if (!email) {
            setError({error, email: 'Field required'});
            return;
        } else {
            setError({error, email: null});
        }

        if (!validator.isEmail(email)) {
            setError({error, email: 'Field required'});
            return;
        } else {
            setError({error, email: null});
        }

        if (!username) {
            setError({error, username: 'Field required'});
            return;
        } else {
            setError({error, username: null});
        }

        if (!phone) {
            setError({error, phone: 'Field required'});
            return;
        } else {
            setError({error, phone: null});
        }

        if (!validator.isMobilePhone(phone)) {
            setError({error, phone: 'Field required'});
            return;
        } else {
            setError({error, phone: null});
        }


        if (!emergencyPhoneNumber) {
            setError({error, emergencyPhoneNumber: 'Field required'});
            return;
        } else {
            setError({error, emergencyPhoneNumber: null});
        }

        if (!validator.isMobilePhone(emergencyPhoneNumber)) {
            setError({error, emergencyPhoneNumber: 'Field required'});
            return;
        } else {
            setError({error, emergencyPhoneNumber: null});
        }

        if (!code) {
            setError({error, code: 'Field required'});
            return;
        } else {
            setError({error, code: null});
        }


        if (!password) {
            setError({error, password: 'Field required'});
            return;
        } else {
            setError({error, password: null});
        }

        if (!validator.isStrongPassword(password)) {
            setError({error, password: 'Field required'});
            return;
        } else {
            setError({error, password: null});
        }

        if (!confirmPassword) {
            setError({error, confirmPassword: 'Field required'});
            return;
        } else {
            setError({error, confirmPassword: null});
        }


        if (password !== confirmPassword) {
            setError({error, confirmPassword: 'Password mismatch', password: 'Password mismatch'});
            return;
        } else {
            setError({error, confirmPassword: null, password: null});
        }

        dispatch(INVITATION_ACTION_CREATORS.acceptInvitation({...user}, invitationID));
    }

    const dispatch = useDispatch();

    return (
        <Card elevation={1}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <CardContent>
                {
                    error.image && (
                        <Alert sx={{my: 3}} severity="error" color="error" variant="standard">
                            <AlertTitle>{error.image}</AlertTitle>
                        </Alert>
                    )
                }
                {
                    invitationError && (
                        <Alert sx={{my: 3}} severity="error" color="error" variant="standard">
                            <AlertTitle>{invitationError}</AlertTitle>
                        </Alert>
                    )
                }
                <Typography gutterBottom={true} align="center" variant="h6">
                    Admin Information
                </Typography>
                <Stack my={3} spacing={2} direction="column">

                    <TextField
                        label="Name"
                        fullWidth={true}
                        name="name"
                        required={true}
                        variant="outlined"
                        value={name}
                        error={Boolean(error.name)}
                        helperText={error.name}
                        type="name"
                        color="secondary"
                        placeholder="Enter name"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Email"
                        fullWidth={true}
                        name="email"
                        required={true}
                        variant="outlined"
                        value={email}
                        error={Boolean(error.email)}
                        helperText={error.email}
                        type="email"
                        color="secondary"
                        placeholder="Enter email"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Username"
                        fullWidth={true}
                        name="username"
                        required={true}
                        variant="outlined"
                        value={username}
                        error={Boolean(error.username)}
                        helperText={error.username}
                        type="text"
                        color="secondary"
                        placeholder="Enter username"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Phone"
                        fullWidth={true}
                        name="phone"
                        required={true}
                        variant="outlined"
                        value={phone}
                        error={Boolean(error.phone)}
                        helperText={error.phone}
                        type="tel"
                        color="secondary"
                        placeholder="Enter phone"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Code"
                        fullWidth={true}
                        name="code"
                        required={true}
                        variant="outlined"
                        value={code}
                        disabled={true}
                        error={Boolean(error.code)}
                        helperText={error.code}
                        type="number"
                        color="secondary"
                        placeholder="Enter code"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Emergency Phone"
                        fullWidth={true}
                        name="emergencyPhoneNumber"
                        required={true}
                        variant="outlined"
                        value={emergencyPhoneNumber}
                        error={Boolean(error.emergencyPhoneNumber)}
                        helperText={error.emergencyPhoneNumber}
                        type="tel"
                        color="secondary"
                        placeholder="Enter emergency phone"
                        size="medium"
                        onChange={handleChange}
                    />


                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            label="Password"
                            fullWidth={true}
                            name="password"
                            required={true}
                            color="secondary"
                            placeholder="Enter password"
                            variant="outlined"
                            error={Boolean(error.password)}
                            type={visiblePassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{color: 'secondary.main'}}
                                        aria-label="toggle password visibility"
                                        onClick={() => setVisiblePassword(!visiblePassword)}
                                        onMouseDown={() => setVisiblePassword(!visiblePassword)}
                                        edge="end"
                                    >
                                        {visiblePassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            label="Confirm Password"
                            fullWidth={true}
                            name="confirmPassword"
                            required={true}
                            color="secondary"
                            placeholder="Enter password"
                            variant="outlined"
                            error={Boolean(error.confirmPassword)}
                            type={visibleConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{color: 'secondary.main'}}
                                        aria-label="toggle password visibility"
                                        onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
                                        onMouseDown={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
                                        edge="end">
                                        {visibleConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </Stack>

                <Grid container={true} spacing={1} alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <LoadingButton
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                backgroundColor: 'primary.main',
                                color: 'secondary.main',
                                '&:hover': {
                                    color: 'secondary.main'
                                },
                                '&:focus': {
                                    color: 'secondary.main'
                                },
                                '&:active': {
                                    color: 'secondary.main'
                                },
                            }}
                            size="large"
                            startIcon={invitationLoading && <CircularProgress color="secondary" size="small" />}
                            onSubmit={handleSubmit}
                            onClick={handleSubmit}
                            fullWidth={true}
                            disableElevation={true}
                            disabled={invitationLoading}
                            variant="outlined">
                            Accept Invitation
                        </LoadingButton>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                color: 'primary.main',
                                borderWidth: 2,
                                fontWeight: 'bold',
                                borderColor: 'primary.main',
                                backgroundColor: 'secondary.main',
                                '&:hover': {
                                    borderColor: 'secondary.light',
                                    backgroundColor: 'secondary.dark',
                                    borderWidth: 2,
                                }
                            }}
                            fullWidth={true}
                            onClick={() => dispatch(INVITATION_ACTION_CREATORS.previousPage())}
                            size="large"
                            variant="outlined">Previous</Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default InvitationForm;
