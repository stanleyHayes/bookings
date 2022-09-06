import React, {useState} from "react";
import Layout from "../../components/layout";
import {updateProfile} from "../../redux/authentication/auth-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {Button, Card, CardContent, Container, Divider, Grid, TextField, Typography} from "@mui/material";

const UpdateProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, user} = useSelector(selectAuth);

    const [updatedUser, setUpdatedUser] = useState({
        name: user.name,
        position: user.position,
        department: user.department
    });
    const [error, setError] = useState({});
    const {name, position, department} = updatedUser;

    const handleChange = e => {
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value});
    }

    const {enqueueSnackbar} = useSnackbar();

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!name) {
            setError({error, name: "Field required"});
            return;
        } else {
            setError({error, name: null});
        }

        if (!position) {
            setError({error, position: "Field required"});
            return;
        } else {
            setError({error, position: null});
        }
        if (!department) {
            setError({error, department: "Field required"});
            return;
        } else {
            setError({error, department: null});
        }

        dispatch(updateProfile(
            updatedUser,
            token,
            navigate,
            handleShowNotification));
    }

        return (
            <Layout>
                <Container>
                    <Typography color="textPrimary" variant="h3" align="center">
                        Edit Profile
                    </Typography>

                    <Divider variant="fullWidth"/>

                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} md={6}>
                            <Card variant="outlined" elevation={1}>
                                <CardContent>
                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        margin="normal"
                                        label="Name"
                                        placeholder="Enter name"
                                        required={true}
                                        error={Boolean(error.name)}
                                        helperText={error.name}
                                    />

                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type="text"
                                        name="position"
                                        value={position}
                                        onChange={handleChange}
                                        margin="normal"
                                        label="Position"
                                        placeholder="Enter position"
                                        required={true}
                                        error={Boolean(error.position)}
                                        helperText={error.position}
                                    />

                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        type="text"
                                        name="department"
                                        value={department}
                                        onChange={handleChange}
                                        margin="normal"
                                        label="Department"
                                        placeholder="Enter department"
                                        required={true}
                                        error={Boolean(error.department)}
                                        helperText={error.department}
                                    />

                                    <Button
                                        onClick={handleSubmit}
                                        variant="outlined"
                                        fullWidth={true}
                                        size="large"
                                        disableElevation={true}>
                                        Update Profile
                                    </Button>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Container>
            </Layout>
        )
    }

    export default UpdateProfilePage;
