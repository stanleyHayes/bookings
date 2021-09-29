import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {
    Box,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {deleteBooking, getBookings} from "../../redux/bookings/booking-action-creators";
import {Alert} from "@material-ui/lab";
import {brown, green, grey, purple, red} from "@material-ui/core/colors";
import moment from "moment";
import {Delete, Edit, Visibility} from "@material-ui/icons";
import {useSnackbar} from "notistack";
import ViewBookingDialog from "../../components/dialogs/view-booking-dialog";
import DeleteDialog from "../../components/dialogs/delete-dialog";
import UpdateBookingDialog from "../../components/dialogs/update-booking-dialog";
import {useHistory} from "react-router-dom";

const BookingsPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            loading: {
                marginTop: 66
            },
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            noBookingContainer: {
                minHeight: '50vh'
            },
            noBookingsText: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            completed: {
                backgroundColor: green['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            deleted: {
                backgroundColor: red['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            pending: {
                backgroundColor: grey['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            next: {
                backgroundColor: purple['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            current: {
                backgroundColor: brown['600'],
                fontWeight: 'bold',
                color: 'white',
                padding: 8,
                borderRadius: 32
            },
            visibility: {
                color: green['600'],
                cursor: 'pointer'
            },
            delete: {
                color: red['600'],
                cursor: 'pointer'
            },
            edit: {
                color: grey['600'],
                cursor: 'pointer'
            },
            title: {
                textTransform: 'uppercase'
            }
        }
    });
    const classes = useStyles();

    const {loading, error, bookings, totalBookings} = useSelector(selectBookings);
    const {token} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();
    const history = useHistory();

    const [status, setStatus] = useState("ALL");
    const [page, setPage] = useState(0);
    const query = `page=${page + 1}${status === 'ALL' ? '' : `&status=${status}`}`;
    const [selectedViewBooking, setSelectedViewBooking] = useState(null);
    const [selectedUpdateBooking, setSelectedUpdateBooking] = useState(null);
    const [selectedDeleteBooking, setSelectedDeleteBooking] = useState(null);

    const handlePageChange = page => {
        setPage(page);
    }

    const handleStatusChange = e => {
        setStatus(e.target.value);
    }

    const handleShowNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    useEffect(() => {
        const handleShowNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getBookings(token, query, handleShowNotification));
    }, [dispatch, enqueueSnackbar, query, token]);

    const handleConfirmDeleteBooking = () => {
        dispatch(deleteBooking(selectedDeleteBooking._id, token, history, handleShowNotification));
        setSelectedDeleteBooking(null);
    }

    const renderStatus = status => {
        switch (status) {
            case 'PENDING':
                return <Typography align="center" display="block" variant="body2" className={classes.pending}>
                    {status}
                </Typography>
            case 'DELETED':
                return <Typography align="center" display="block" variant="body2" className={classes.deleted}>
                    {status}
                </Typography>
            case 'COMPLETED':
                return <Typography align="center" display="block" variant="body2" className={classes.completed}>
                    {status}
                </Typography>
            case 'CURRENT':
                return <Typography align="center" display="block" variant="body2" className={classes.current}>
                    {status}
                </Typography>
            case 'NEXT':
                return <Typography align="center" display="block" variant="body2" className={classes.next}>
                    {status}
                </Typography>
            default:
                return <Typography align="center" display="block" variant="body2" className={classes.pending}>
                    {status}
                </Typography>
        }
    }
    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                <Typography className={classes.title} color="textPrimary" variant="h3"
                            align="center">Bookings</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                <Grid spacing={2} container={true} justify="space-between" alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <Typography color="textPrimary" variant="h6">Filter Bookings</Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            defaultValue="ALL"
                            variant="outlined"
                            fullWidth={true}
                            margin="none">
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="COMPLETED">Completed</MenuItem>
                            <MenuItem value="CURRENT">Current</MenuItem>
                            <MenuItem value="NEXT">Next</MenuItem>
                            <MenuItem value="DELETED">Deleted</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" className={classes.divider}/>
                {error && <Alert title={error} severity="error">{error}</Alert>}
                {bookings && bookings.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            className={classes.noBookingsText}
                            variant="h5">
                            No Bookings Available
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Container</TableCell>
                                    <TableCell>Car</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Arriving Date</TableCell>
                                    <TableCell>Arriving Time</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings && bookings.map((booking, index) => {
                                    return (
                                        <TableRow hover={true} key={booking._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{booking.container}</TableCell>
                                            <TableCell>{booking.car}</TableCell>
                                            <TableCell>{renderStatus(booking.status)}</TableCell>
                                            <TableCell>{moment(booking.date).fromNow()}</TableCell>
                                            <TableCell>{new Date(booking.time).toLocaleTimeString()}</TableCell>
                                            <TableCell>
                                                <Grid container={true} spacing={1} alignItems="center">
                                                    <Grid item={true}>
                                                        <Visibility
                                                            onClick={() => setSelectedViewBooking(booking)}
                                                            className={classes.visibility}/>
                                                    </Grid>
                                                    <Grid item={true}>
                                                        <Edit
                                                            onClick={() => setSelectedUpdateBooking(booking)}
                                                            className={classes.edit}/>
                                                    </Grid>
                                                    <Grid item={true}>
                                                        <Delete
                                                            onClick={() => setSelectedDeleteBooking(booking)}
                                                            className={classes.delete}/>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TablePagination
                                count={Math.floor(totalBookings / 10)}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={25}
                            />
                        </Table>
                    </TableContainer>
                )}

                {selectedViewBooking && (
                    <ViewBookingDialog
                        booking={selectedViewBooking}
                        open={Boolean(selectedViewBooking)}
                        handleClose={() => setSelectedViewBooking(null)}
                    />
                )}

                {selectedUpdateBooking && (
                    <UpdateBookingDialog
                        booking={selectedUpdateBooking}
                        open={Boolean(selectedUpdateBooking)}
                        handleClose={() => setSelectedUpdateBooking(null)}
                    />
                )}

                {selectedDeleteBooking && (
                    <DeleteDialog
                        confirmDelete={handleConfirmDeleteBooking}
                        message={`Are you sure you want to delete booking with container ${selectedDeleteBooking.container}`}
                        open={Boolean(selectedDeleteBooking)}
                        handleClose={() => setSelectedDeleteBooking(null)}
                    />
                )}
            </Container>
        </Layout>
    )
}

export default BookingsPage;