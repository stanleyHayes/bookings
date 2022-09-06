import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {createBooking, updateBooking} from "../../redux/bookings/booking-action-creators";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import {Button, Dialog, DialogActions, DialogContent, Divider, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";

const UpdateBookingDialog = ({open, handleClose, booking}) => {

    const {bookingID} = useParams();

    const [updatedBooking, setBooking] = useState(booking);
    const [error, setError] = useState({});
    const {car, contact, name, container, company,  date, product} = updatedBooking;

    const {token} = useSelector(selectAuth);

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const handleBookingChange = e => {
        setBooking({...booking, [e.target.name]: e.target.value});
    }

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }


    const [dob, setDOB] = useState();
    const [time, setTime] = useState();

    const navigate = useNavigate();

    const handleDOBChange = date => {
        setDOB(date);
    }

    const handleTimeChange = time => {
        setTime(time);
    }

    const handleBookingSubmit = e => {
        e.preventDefault();

        if (!container) {
            setError({error, container: "Field required"});
            return;
        } else {
            setError({error, container: null});
        }

        if (!company) {
            setError({error, company: "Field required"});
            return;
        } else {
            setError({error, company: null});
        }
        if (!product) {
            setError({error, product: "Field required"});
            return;
        } else {
            setError({...error, product: null});
        }

        if (!car) {
            setError({error, car: "Field required"});
            return;
        } else {
            setError({error, car: null});
        }

        if (!name) {
            setError({error, name: "Field required"});
            return;
        } else {
            setError({error, name: null});
        }


        if (!contact) {
            setError({error, contact: "Field required"});
            return;
        } else {
            setError({error, contact: null});
        }

        if (!date) {
            setError({error, date: "Field required"});
            return;
        } else {
            setError({error, date: null});
        }

        if (!time) {
            setError({error, time: "Field required"});
            return;
        } else {
            setError({error, time: null});
        }
        dispatch(updateBooking(bookingID, booking, token, navigate, handleShowNotification));
    }

    const handleDateChange = date => {
        setBooking({...booking, date});
    }

    const formik = useFormik({
        validationSchema: yup.object().shape({
            firstName: yup.string().required('First name required'),
            lastName: yup.string().required('Last name required'),
            phone: yup.string().phone('Invalid phone number').required('Phone number required'),
            gender: yup.string()
                .oneOf(['male', 'female'], 'select either male or female')
                .required('Gender required'),
            ssn: yup.string().required('SSN required'),
            addressLine1: yup.string().required('Address required')
        }),
        validateOnChange: true,
        validateOnBlur: true,
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            gender: '',
            ssn: '',
            addressLine1: '',
            addressLine2: '',
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(createBooking(booking, token, navigate, handleShowNotification));
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

                <Divider variant="fullWidth"/>

                <TextField
                    variant="outlined"
                    fullWidth={true}
                    type="text"
                    name="container"
                    value={container}
                    onChange={handleBookingChange}
                    margin="normal"
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
                    label="Driver's Contact"
                    placeholder="Enter driver's contact"
                    required={true}
                    error={Boolean(error.contact)}
                    helperText={error.contact}
                />

                <DatePicker
                    label="Date of Birth"
                    required={true}
                    InputLabelProps={{shrink: true}}
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                name="dob"
                                placeholder="Select Date of Birth"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                size="medium"
                                fullWidth={true}
                                helperText={formik.touched.dob && formik.errors.dob}
                                error={Boolean(formik.touched.dob && formik.errors.dob)}
                            />
                        )

                    }}
                    value={dob}
                    color="primary"
                    onChange={handleDOBChange}/>

                <TimePicker
                    variant="dialog"
                    value={time}
                    InputAdornmentProps={{position: "start"}}
                    fullWidth={true}
                    name="time"
                    label="Booking Time"
                    onChange={handleTimeChange}
                    inputVariant="outlined"
                    autoOk={true}
                    required={true}
                    ampm={true}
                    error={Boolean(error.time)}
                    helperText={error.time}
                    okLabel={<Button>OK</Button>}
                    placeholder={"Select Booking Time"}
                    cancelLabel={<Button>Cancel</Button>}
                    emptyLabel="Booking Time"
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                name="dob"
                                placeholder="Select Date of Birth"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                size="medium"
                                fullWidth={true}
                                helperText={formik.touched.dob && formik.errors.dob}
                                error={Boolean(formik.touched.dob && formik.errors.dob)}
                            />
                        )

                    }}
                />

                <Button
                    onClick={handleBookingSubmit}
                    variant="outlined"
                    fullWidth={true}
                    size="large"
                    disableElevation={true}>
                    Update Booking
                </Button>

            </DialogContent>

            <Divider variant="fullWidth" light={true}/>
            <DialogActions>
                <Button
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
