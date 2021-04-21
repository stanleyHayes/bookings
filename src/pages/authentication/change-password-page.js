import React, {useState} from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles, Switch,
    TextField,
    Typography
} from "@material-ui/core";


const ChangePasswordPage = () => {

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

        if(!currentPassword){
            setError({...error, currentPassword: "Field required"});
            return;
        }else {
            setError({...error, currentPassword: null});
        }

        if(!newPassword){
            setError({...error, newPassword: "Field required"});
            return;
        }else {
            setError({...error, newPassword: null});
        }

        if(!confirmPassword){
            setError({...error, confirmPassword: "Field required"});
            return;
        }else {
            setError({...error, confirmPassword: null});
        }

        if(confirmPassword !== newPassword){
            setError({...error, confirmPassword: "Password Mismatch", newPassword: "Password Mismatch"});
            return;
        }else {
            setError({...error, confirmPassword: null, newPassword: null});
        }
        console.log(passwords);
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    }

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography  color="textPrimary"  variant="h3" align="center">Change Password</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type={visible ? "text": "password"}
                                    name="currentPassword"
                                    value={currentPassword}
                                    onChange={handlePasswordChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Current Password"
                                    placeholder="Enter current password"
                                    required={true}
                                    error={Boolean(error.currentPassword)}
                                    helperText={error.currentPassword}
                                />

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type={visible ? "text": "password"}
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="New Password"
                                    placeholder="Enter new password"
                                    required={true}
                                    error={Boolean(error.newPassword)}
                                    helperText={error.newPassword}
                                />

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type={visible ? "text": "password"}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Confirm Password"
                                    placeholder="Confirm new password"
                                    required={true}
                                    error={Boolean(error.confirmPassword)}
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
                                    className={classes.button}
                                    onClick={handleChangePasswordSubmit}
                                    variant="contained"
                                    fullWidth={true}
                                    size="large"
                                    disableElevation={true}>
                                    Submit Password
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default ChangePasswordPage;