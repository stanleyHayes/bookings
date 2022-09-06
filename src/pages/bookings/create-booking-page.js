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
    Divider,
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

const CreateBookingPage = () => {

    const dispatch = useDispatch();

    const {token} = useSelector(selectAuth);

    const {enqueueSnackbar} = useSnackbar();
    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const [dateError, setDateError] = useState(null);
    const [timeError, setTimeError] = useState(null);

    const [date, setDate] = useState(new Date());
    const handleDateChange = date => {
        setDate(date);
    }

    const [time, setTime] = useState(new Date());
    const handleTimeChange = time => {
        setTime(time);
    }

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
            date: yup.string().required('Date required'),
            time: yup.string().required('Time required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        initialValues: {
            car: '', contact: '', name: '', container: '', company: '', product: '', date: '', time: ''
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(createBooking(values, token, navigate, handleShowNotification));
        }
    });

    console.log(formik.values);

    return (
        <Layout>
            <Box sx={{py: 8}}>
                <Container maxWidth="md">
                    <Typography
                        sx={{color: 'text.primary'}}
                        variant="h4"
                        align="center">Create Booking</Typography>
                    <Divider sx={{my: 3}} light={true} variant="fullWidth"/>
                    <Card
                        sx={{
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
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
                                                    label="Select Booking Date"
                                                    required={true}
                                                    InputLabelProps={{shrink: true}}
                                                    renderInput={params => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                name="date"
                                                                placeholder="Select Booking Date"
                                                                variant="outlined"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                size="medium"
                                                                fullWidth={true}
                                                                helperText={formik.touched.date && formik.errors.date}
                                                                error={Boolean(formik.touched.date && formik.errors.date)}
                                                            />
                                                        )

                                                    }}
                                                    value={formik.values.date}
                                                    color="primary"
                                                    onChange={formik.handleChange}/>
                                            </Grid>
                                            <Grid item={true} xs={12} md={6}>
                                                <TimePicker
                                                    value={time}
                                                    fullWidth={true}
                                                    name="time"
                                                    label="Booking Time"
                                                    onChange={handleTimeChange}
                                                    inputVariant="outlined"
                                                    required={true}
                                                    ampm={true}
                                                    error={Boolean(timeError)}
                                                    helperText={timeError}
                                                    okLabel={<Button>OK</Button>}
                                                    placeholder={"Select Booking Time"}
                                                    cancelLabel={<Button>Cancel</Button>}
                                                    emptyLabel="Booking Time"
                                                    renderInput={params => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                name="time"
                                                                placeholder="Select Booking Time"
                                                                variant="outlined"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                size="medium"
                                                                value={time}
                                                                fullWidth={true}
                                                                helperText={timeError}
                                                                error={Boolean(timeError)}
                                                            />
                                                        )

                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Grid container={true} justifyContent="center">
                                            <Grid item={true} xs={12} md={6}>
                                                <Button
                                                    type="submit"
                                                    color="secondary"
                                                    onClick={formik.handleSubmit}
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
                                            </Grid>
                                        </Grid>
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
