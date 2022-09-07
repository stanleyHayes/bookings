import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {red} from "@mui/material/colors";

const UpdateBookingDialog = ({open, handleClose, booking}) => {

    const {bookingID} = useParams();

    const {token} = useSelector(selectAuth);

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const [date, setDate] = useState(booking.date);
    const [time, setTime] = useState(booking.time);

    const navigate = useNavigate();

    const handleDateChange = date => {
        setDate(date);
    }

    const handleTimeChange = time => {
        setTime(time);
    }

    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');

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
            car: booking.car,
            contact: booking.contact,
            name: booking.name,
            container: booking.container,
            company: booking.company,
            product: booking.product,
        },
        onSubmit: (values, {resetForm}) => {
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
            dispatch(updateBooking(bookingID, {
                ...values,
                time: time.toString(),
                date: date.toString()
            }, token, navigate, handleShowNotification));
        }
    });

    return (
        <Dialog open={open} handleClose={handleClose}>
            <DialogContent>
                <Typography
                    variant="h5"
                    align="center">
                    Update Booking
                </Typography>

                <Divider sx={{my: 3}} variant="fullWidth"/>

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
                                        onChange={handleDateChange}
                                        closeOnSelect={true}
                                        showToolbar={true}
                                        InputLabelProps={{shrink: true}}
                                        renderInput={params => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    name="date"
                                                    placeholder="Select Booking Date"
                                                    variant="outlined"
                                                    size="medium"
                                                    fullWidth={true}
                                                    helperText={
                                                        <Typography variant="body2" sx={{color: red[600]}}>
                                                            {dateError}
                                                        </Typography>
                                                    }
                                                    error={Boolean(dateError)}
                                                />
                                            )

                                        }}
                                        value={date}
                                        color="primary"/>
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
                                        Update Booking
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </form>

            </DialogContent>

            <Divider sx={{my: 2}} variant="fullWidth" light={true}/>

            <DialogActions>
                <Button
                    sx={{
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderTopLeftRadius: 0,
                        py: 1.2,
                        textTransform: 'capitalize'
                    }}
                    color="primary"
                    fullWidth={true}
                    onClick={handleClose}
                    variant="outlined"
                    size="medium">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateBookingDialog;
