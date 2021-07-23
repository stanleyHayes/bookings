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
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, TimePicker} from '@material-ui/pickers';
import {useHistory} from "react-router-dom";
import {createBooking} from "../../redux/bookings/booking-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {Alert} from "@material-ui/lab";

const CreateBookingPage = () => {

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

    const [booking, setBooking] = useState({date: "", time: ""});
    const [error, setError] = useState({});
    const {car, contact, name, container, company, time, date, product} = booking;

    const {token, loading: authLoading} = useSelector(selectAuth);

    useEffect(() => {
        if (!authLoading && !token) {
            history.push('/auth/login');
        }
    }, [history, authLoading, token]);

    const handleBookingChange = e => {
        setBooking({...booking, [e.target.name]: e.target.value});
    }

    const handleBookingSubmit = e => {
        e.preventDefault();

        if (!container) {
            setError({...error, container: "Field required"});
            return;
        } else {
            setError({...error, container: null});
        }

        if (!company) {
            setError({...error, company: "Field required"});
            return;
        } else {
            setError({...error, company: null});
        }
        if (!product) {
            setError({...error, product: "Field required"});
            return;
        } else {
            setError({...error, product: null});
        }

        if (!car) {
            setError({...error, car: "Field required"});
            return;
        } else {
            setError({...error, car: null});
        }

        if (!name) {
            setError({...error, name: "Field required"});
            return;
        } else {
            setError({...error, name: null});
        }


        if (!contact) {
            setError({...error, contact: "Field required"});
            return;
        } else {
            setError({...error, contact: null});
        }

        if (!date) {
            setError({...error, date: "Field required"});
            return;
        } else {
            setError({...error, date: null});
        }

        if (!time) {
            setError({...error, time: "Field required"});
            return;
        } else {
            setError({...error, time: null});
        }
        dispatch(createBooking({booking, token, history}));
    }

    const handleDateChange = (date) => {
        setBooking({...booking, date});
    }

    const handleTimeChange = time => {
        setBooking({...booking, time});
    }

    const {loading, error: bookingError} = useSelector(selectBookings);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">Create Booking</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>

                {loading && <LinearProgress color="secondary" variant="query"/>}
                {bookingError && <Alert title={bookingError} severity="error">{bookingError}</Alert>}

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="text"
                                    name="container"
                                    value={container}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Container No."
                                    placeholder="Enter container number"
                                    required={true}
                                    error={Boolean(error.container)}
                                    helperText={error.container}
                                />

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Company Name"
                                    placeholder="Enter company name"
                                    required={true}
                                    error={Boolean(error.company)}
                                    helperText={error.company}
                                />

                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="text"
                                    name="product"
                                    value={product}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Product"
                                    placeholder="Enter product name"
                                    required={true}
                                    error={Boolean(error.product)}
                                    helperText={error.product}
                                />


                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="text"
                                    name="car"
                                    value={car}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Car No."
                                    placeholder="Enter car number"
                                    required={true}
                                    error={Boolean(error.car)}
                                    helperText={error.car}
                                />


                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Driver's Name"
                                    placeholder="Enter drivers name"
                                    required={true}
                                    error={Boolean(error.name)}
                                    helperText={error.name}
                                />


                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    type="tel"
                                    name="contact"
                                    value={contact}
                                    onChange={handleBookingChange}
                                    margin="normal"
                                    className={classes.textField}
                                    label="Driver's Contact"
                                    placeholder="Enter driver's contact"
                                    required={true}
                                    error={Boolean(error.contact)}
                                    helperText={error.contact}
                                />

                                <DatePicker
                                    variant="dialog"
                                    value={date}
                                    name="date"
                                    fullWidth={true}
                                    label="Booking Date"
                                    onChange={handleDateChange}
                                    inputVariant="outlined"
                                    disablePast={true}
                                    autoOk={true}
                                    required={true}
                                    InputAdornmentProps={{position: "start"}}
                                    error={Boolean(error.date)}
                                    helperText={error.date}
                                    className={classes.textField}
                                    placeholder={"Select Booking Date"}
                                    okLabel={<Button>OK</Button>}
                                    cancelLabel={<Button>Cancel</Button>}
                                    emptyLabel="Booking Date"
                                />

                                <TimePicker
                                    variant="dialog"
                                    value={time}
                                    InputAdornmentProps={{position: "start"}}
                                    fullWidth={true}
                                    name="time"
                                    label="Booking Time"
                                    onChange={handleTimeChange}
                                    inputVariant="outlined"
                                    disablePast={true}
                                    autoOk={true}
                                    required={true}
                                    ampm={true}
                                    error={Boolean(error.time)}
                                    helperText={error.time}
                                    className={classes.textField}
                                    okLabel={<Button>OK</Button>}
                                    placeholder={"Select Booking Time"}
                                    cancelLabel={<Button>Cancel</Button>}
                                    emptyLabel="Booking Time"
                                />

                                <Button
                                    className={classes.button}
                                    onClick={handleBookingSubmit}
                                    variant="outlined"
                                    fullWidth={true}
                                    size="large"
                                    disableElevation={true}>
                                    Submit Booking
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default CreateBookingPage;