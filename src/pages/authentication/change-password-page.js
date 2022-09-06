import React, {useState} from "react";
import Layout from "../../components/layout";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {changePassword} from "../../redux/authentication/auth-action-creators";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Switch,
    TextField,
    Typography
} from "@mui/material";

const ChangePasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, loading} = useSelector(selectAuth);

    const [passwords, setPasswords] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const {currentPassword, newPassword} = passwords;
    const [visible, setVisible] = useState(false);

    const handlePasswordChange = e => {
        setPasswords({...passwords, [e.target.name]: e.target.value});
    }

    const handleChangePasswordSubmit = e => {
        e.preventDefault();

        if (!currentPassword) {
            setError({...error, currentPassword: "Field required"});
            return;
        } else {
            setError({...error, currentPassword: null});
        }

        if (!newPassword) {
            setError({...error, newPassword: "Field required"});
            return;
        } else {
            setError({...error, newPassword: null});
        }

        if (!confirmPassword) {
            setError({...error, confirmPassword: "Field required"});
            return;
        } else {
            setError({...error, confirmPassword: null});
        }

        if (confirmPassword !== newPassword) {
            setError({...error, confirmPassword: "Password Mismatch", newPassword: "Password Mismatch"});
            return;
        } else {
            setError({...error, confirmPassword: null, newPassword: null});
        }
        dispatch(changePassword(passwords, token, navigate));
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    return (
        <Layout>
            {loading && <LinearProgress color="secondary" variant="query"/>}
            <Box sx={{minHeight: '100vh', py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Container>

                    <Typography
                        sx={{color: 'text.primary'}}
                        variant="h4"
                        align="center">
                        Change Password
                    </Typography>

                    <Divider sx={{my: 3}} light={true} variant="fullWidth"/>

                    <Grid container={true} justify="center">
                        <Grid item={true} xs={12} md={6}>
                            <Card sx={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 32,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 0,
                                textTransform: 'capitalize'
                            }} variant="elevation" elevation={1}>
                                <CardContent>
                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type={visible ? "text" : "password"}
                                        name="currentPassword"
                                        value={currentPassword}
                                        onChange={handlePasswordChange}
                                        margin="normal"
                                        label="Current Password"
                                        placeholder="Enter current password"
                                        required={true}
                                        error={!!error.currentPassword}
                                        helperText={error.currentPassword}
                                    />

                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type={visible ? "text" : "password"}
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        margin="normal"
                                        label="New Password"
                                        placeholder="Enter new password"
                                        required={true}
                                        error={!!error.newPassword}
                                        helperText={error.newPassword}
                                    />

                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type={visible ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        margin="normal"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="Confirm new password"
                                        required={true}
                                        error={!!error.confirmPassword}
                                        helperText={error.confirmPassword}
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
                                        sx={{
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                            textTransform: 'capitalize'
                                        }}
                                        onClick={handleChangePasswordSubmit}
                                        variant="outlined"
                                        fullWidth={true}
                                        color="secondary"
                                        size="large"
                                        disableElevation={true}>
                                        Submit Password
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    )
}

export default ChangePasswordPage;
