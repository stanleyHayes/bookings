import React, {useState} from "react";
import Layout from "../../components/layout";
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
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, TimePicker} from '@mui/x-date-pickers';
import {createBooking} from "../../redux/bookings/booking-action-creators";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import * as yup from "yup";
import moment from "moment";

const CreateBookingPage = () => {

    const dispatch = useDispatch();

    const {token} = useSelector(selectAuth);

    const {enqueueSnackbar} = useSnackbar();
    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    //
    const [date, setDate] = useState(moment.now());
    const [time, setTime] = useState(moment.now());

    const {loading, error: bookingError} = useSelector(selectBookings);

    const navigate = useNavigate();

    const formik = useFormik({
        validationSchema: yup.object().shape({
            car: yup.string().required('Car number required'),
            contact: yup.string().required('Contact required'),
            name: yup.string().required('Driver name required required'),
            container: yup.string().required('Container required'),
            company: yup.string().required('Company required'),
            product: yup.string().required('Product required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        initialValues: {
            car: '', contact: '', name: '', container: '', company: '', product: ''
        },
        onSubmit: (values) => {
            if (!time) {
                setTimeError('Booking time required');
                return;
            } else {
                setTimeError(null);
            }
            if (!date) {
                setDateError('Booking date required');
                return;
            } else {
                setDateError(null);
            }
            dispatch(createBooking({
                ...values,
                time: time.toString(),
                date: date.toString()
            }, token, navigate, handleShowNotification));
        }
    });

    return (
        <Layout>
            <Box sx={{py: 8}}>
                <Container maxWidth="md">
                    <Typography sx={{color: 'text.primary', mb: 4}} variant="h4">Create Booking</Typography>
                    <Card
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 32,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 0
                        }} variant="elevation" elevation={1}>
                        {loading && <LinearProgress color="secondary" variant="query"/>}
                        <CardContent>
                            {bookingError &&
                                <Alert
                                    variant="filled"
                                    title={bookingError}
                                    severity="error">
                                    <AlertTitle>
                                        {bookingError}
                                    </AlertTitle>
                                </Alert>}
                            <form onSubmit={formik.handleSubmit}>
                                <Stack direction="column" spacing={2}>
                                    <Box>
                                        <Grid container={true} spacing={2}>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="text"
                                                    name="container"
                                                    value={formik.values.container}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Container No."
                                                    placeholder="Enter container number"
                                                    required={true}
                                                    error={Boolean(formik.touched.container && formik.errors.container)}
                                                    helperText={formik.touched.container && formik.errors.container}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="text"
                                                    name="company"
                                                    value={formik.values.company}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Company Name"
                                                    placeholder="Enter company name"
                                                    required={true}
                                                    error={Boolean(formik.touched.company && formik.errors.company)}
                                                    helperText={formik.touched.company && formik.errors.company}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Grid container={true} spacing={2}>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="text"
                                                    name="product"
                                                    value={formik.values.product}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Product"
                                                    placeholder="Enter product name"
                                                    required={true}
                                                    error={Boolean(formik.touched.product && formik.errors.product)}
                                                    helperText={formik.touched.product && formik.errors.product}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="text"
                                                    name="car"
                                                    value={formik.values.car}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Car No."
                                                    placeholder="Enter car number"
                                                    required={true}
                                                    error={Boolean(formik.touched.car && formik.errors.car)}
                                                    helperText={formik.touched.car && formik.errors.car}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Grid container={true} spacing={2}>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="text"
                                                    name="name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Driver's Name"
                                                    placeholder="Enter drivers name"
                                                    required={true}
                                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                                    helperText={formik.touched.name && formik.errors.name}
                                                />
                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    type="tel"
                                                    name="contact"
                                                    value={formik.values.contact}
                                                    onChange={formik.handleChange}
                                                    margin="normal"
                                                    label="Driver's Contact"
                                                    placeholder="Enter driver's contact"
                                                    required={true}
                                                    error={Boolean(formik.touched.contact && formik.errors.contact)}
                                                    helperText={formik.touched.contact && formik.errors.contact}
                                                />

                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Grid container={true} spacing={2}>
                                            <Grid item={true} xs={12} md={6}>
                                                <DatePicker
                                                    slotProps={{
                                                        textField: {
                                                            size: "medium",
                                                            fullWidth: true,
                                                            helperText: dateError ? dateError: "Select Booking Time"
                                                        }
                                                    }}
                                                    onError={error => setDateError(error)}
                                                    value={date}
                                                    onChange={date => setDate(date)}
                                                    disableFuture={true}
                                                    name="date"
                                                />

                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <TimePicker
                                                    slotProps={{
                                                        textField: {
                                                            size: "medium",
                                                            fullWidth: true,
                                                            helperText: timeError ? timeError: "Select Booking Time"
                                                        }
                                                    }}
                                                    onError={error => setTimeError(error)}
                                                    ampm={true}
                                                    ampmInClock={true}
                                                    name="time"
                                                    label="Booking time"
                                                    value={time}
                                                    onChange={(time) => setTime(time)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Button
                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                            sx={{
                                                borderBottomRightRadius: 0,
                                                borderTopRightRadius: 12,
                                                borderBottomLeftRadius: 12,
                                                borderTopLeftRadius: 0,
                                                py: 1.2
                                            }}
                                            fullWidth={true}
                                            size="large"
                                            disableElevation={true}>
                                            Submit Booking
                                        </Button>
                                    </Box>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Layout>
    )
}

export default CreateBookingPage;
