import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    FormHelperText,
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
import {KeyboardArrowLeft, Visibility, VisibilityOff} from "@mui/icons-material";
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import {INVITATION_ACTION_CREATORS} from "../../redux/invitations/invitation-action-creators";
import {LoadingButton} from "@mui/lab";
import {useFormik} from "formik";
import * as yup from "yup";

const InvitationForm = ({code, invitationID}) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            department: '',
            position: '',
            password: '',
            confirmPassword: '',
            email: '',
            code
        },
        onSubmit: (values) => {
            dispatch(INVITATION_ACTION_CREATORS.acceptInvitation(values, invitationID));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            name: yup.string().required('Name required'),
            position: yup.string().required('Position required'),
            department: yup.string().required('Department required'),
            email: yup.string().email('Invalid email').required('Email required'),
            password: yup.string().required('Password required'),
            confirmPassword: yup.string()
                .required('confirm password required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            phone: yup.string().phone('Enter valid phone number').required('Phone number required'),
            code: yup.string().required('Code required'),
        })
    });


    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const {invitationError, invitationLoading} = useSelector(selectInvitations);

    const dispatch = useDispatch();

    return (
        <Card
            sx={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 32,
                borderBottomLeftRadius: 32,
                borderTopLeftRadius: 0,
            }} elevation={1}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <CardContent>
                {
                    invitationError && (
                        <Alert sx={{my: 3}} severity="error" color="error" variant="standard">
                            <AlertTitle>{invitationError}</AlertTitle>
                        </Alert>
                    )
                }
                <Typography sx={{mb: 2}} gutterBottom={true} align="center" variant="h6">
                    Admin Information
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack my={3} spacing={2} direction="column">

                        <TextField
                            label="Name"
                            fullWidth={true}
                            name="name"
                            required={true}
                            variant="outlined"
                            value={formik.values.name}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                            type="text"
                            color="secondary"
                            placeholder="Enter name"
                            size="medium"
                            onChange={formik.handleChange}
                        />

                        <TextField
                            label="Email"
                            fullWidth={true}
                            name="email"
                            required={true}
                            variant="outlined"
                            value={formik.values.email}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            type="email"
                            color="secondary"
                            placeholder="Enter email"
                            size="medium"
                            onChange={formik.handleChange}
                        />

                        <TextField
                            label="Position"
                            fullWidth={true}
                            name="username"
                            required={true}
                            variant="outlined"
                            value={formik.values.position}
                            error={Boolean(formik.touched.position && formik.errors.position)}
                            helperText={formik.touched.position && formik.errors.position}
                            type="text"
                            color="secondary"
                            placeholder="Enter position"
                            size="medium"
                            onChange={formik.handleChange}
                        />

                        <TextField
                            label="Phone"
                            fullWidth={true}
                            name="phone"
                            required={true}
                            variant="outlined"
                            value={formik.values.phone}
                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            type="tel"
                            color="secondary"
                            placeholder="Enter phone"
                            size="medium"
                            onChange={formik.handleChange}
                        />

                        <TextField
                            label="Code"
                            fullWidth={true}
                            name="code"
                            required={true}
                            variant="outlined"
                            value={formik.values.code}
                            disabled={true}
                            error={Boolean(formik.touched.code && formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            type="number"
                            color="secondary"
                            placeholder="Enter code"
                            size="medium"
                        />

                        <TextField
                            label="Department"
                            fullWidth={true}
                            name="department"
                            required={true}
                            variant="outlined"
                            value={formik.values.department}
                            error={Boolean(formik.touched.department && formik.errors.department)}
                            helperText={formik.touched.department && formik.errors.department}
                            type="text"
                            color="secondary"
                            placeholder="Enter department"
                            size="medium"
                            onChange={formik.handleChange}
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
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                type={visiblePassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{color: 'secondary.main'}}
                                            aria-label="toggle password visibility"
                                            onClick={() => setVisiblePassword(!visiblePassword)}
                                            onMouseDown={() => setVisiblePassword(!visiblePassword)}
                                            edge="end">
                                            {visiblePassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.touched.password && formik.errors.password && (
                                <FormHelperText>
                                    {formik.errors.password}
                                </FormHelperText>
                            )}
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
                                error={Boolean(formik.errors.confirmPassword)}
                                type={visibleConfirmPassword ? 'text' : 'password'}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
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
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <FormHelperText>
                                    {formik.errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box>
                            <Grid container={true} spacing={1} alignItems="center">
                                <Grid item={true} xs={12} md={6}>
                                    <LoadingButton
                                        sx={{
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                            textTransform: 'capitalize',
                                        }}
                                        size="large"
                                        color="secondary"
                                        startIcon={invitationLoading &&
                                            <CircularProgress color="secondary" size="small"/>}
                                        onSubmit={formik.handleSubmit}
                                        onClick={formik.handleSubmit}
                                        type="submit"
                                        fullWidth={true}
                                        disableElevation={true}
                                        disabled={invitationLoading}
                                        variant="contained">
                                        Accept Invitation
                                    </LoadingButton>
                                </Grid>
                                <Grid item={true} xs={12} md={6}>
                                    <Button
                                        sx={{
                                            textTransform: 'capitalize',
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                        }}
                                        startIcon={<KeyboardArrowLeft/>}
                                        fullWidth={true}
                                        color="secondary"
                                        onClick={() => dispatch(INVITATION_ACTION_CREATORS.previousPage())}
                                        size="large"
                                        variant="outlined">Previous</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

export default InvitationForm;
