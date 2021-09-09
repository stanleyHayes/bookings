import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {useSnackbar} from "notistack";
import {updateBooking} from "../../redux/bookings/booking-action-creators";
import {DatePicker, TimePicker} from "@material-ui/pickers";

const UpdateBookingDialog = ({open, handleClose, booking}) => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
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
            closeButton: {
                paddingTop: 8,
                paddingBottom: 8,
            },
            title: {
                textTransform: "uppercase"
            }
        }
    });

    const classes = useStyles();
    const {bookingID} = useParams();

    const [updatedBooking, setBooking] = useState(booking);
    const [error, setError] = useState({});
    const {car, contact, name, container, company, time, date, product} = updatedBooking;

    const {token} = useSelector(selectAuth);

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleBookingChange = e => {
        setBooking({...booking, [e.target.name]: e.target.value});
    }

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
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
        dispatch(updateBooking(bookingID, booking, token, history, handleShowNotification));
    }

    const handleDateChange = date => {
        setBooking({...booking, date});
    }

    const handleTimeChange = time => {
        setBooking({...booking, time});
    }

    return (
        <Dialog open={open} handleClose={handleClose}>
            <DialogContent>
                <Typography
                    className={classes.title}
                    color="textPrimary"
                    variant="h5"
                    align="center">
                    Update Booking
                </Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

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
                />

                <TimePicker
                    variant="dialog"
                    value={time}
                    InputAdornmentProps={{position: "start"}}
                    fullWidth={true}
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
                />

                <Button
                    className={classes.button}
                    onClick={handleBookingSubmit}
                    variant="outlined"
                    fullWidth={true}
                    size="large"
                    disableElevation={true}>
                    Update Booking
                </Button>

            </DialogContent>

            <Divider variant="fullWidth" className={classes.subDivider} light={true} />
            <DialogActions>
                <Button
                    className={classes.closeButton}
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