import React, {useState} from "react";
import Layout from "../../components/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {updateProfile} from "../../redux/authentication/auth-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectAuth} from "../../redux/authentication/auth-reducer";

const UpdateProfilePage = () => {

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

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const {name, position, department} = user;
    const {token} = useSelector(selectAuth);

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!name) {
            setError({...error, name: "Field required"});
            return;
        } else {
            setError({...error, name: null});
        }

        if (!position) {
            setError({...error, position: "Field required"});
            return;
        } else {
            setError({...error, position: null});
        }
        if (!department) {
            setError({...error, department: "Field required"});
            return;
        } else {
            setError({...error, department: null});
        }
        dispatch(updateProfile(user, token, history));
    }


    return (
        <Layout>
            <Container className={classes.container}>
                <Typography  color="textPrimary"  variant="h3" align="center">
                    Edit Profile
                </Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Grid container={true} justify="center">
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
                                    className={classes.textField}
                                    label="Container No."
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
                                    className={classes.textField}
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
                                    className={classes.textField}
                                    label="Department"
                                    placeholder="Enter department"
                                    required={true}
                                    error={Boolean(error.department)}
                                    helperText={error.department}
                                />

                                <Button
                                    className={classes.button}
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