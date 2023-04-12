import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Divider,
    Grid,
    LinearProgress,
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
    Tooltip,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {deleteBooking, getBookings} from "../../redux/bookings/booking-action-creators";
import moment from "moment";
import {useSnackbar} from "notistack";
import ViewBookingDialog from "../../components/dialogs/view-booking-dialog";
import DeleteDialog from "../../components/dialogs/delete-dialog";
import UpdateBookingDialog from "../../components/dialogs/update-booking-dialog";
import {useNavigate} from "react-router";
import {Delete, Edit, Visibility} from "@mui/icons-material";

const BookingsPage = () => {

    const {loading, error, bookings, totalBookings} = useSelector(selectBookings);
    const {token} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(deleteBooking(selectedDeleteBooking._id, token, navigate, handleShowNotification));
        setSelectedDeleteBooking(null);
    }

    const renderStatus = status => {
        switch (status) {
            case 'PENDING':
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
            case 'DELETED':
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
            case 'COMPLETED':
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
            case 'CURRENT':
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
            case 'NEXT':
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
            default:
                return <Typography align="center" display="block" variant="body2">
                    {status}
                </Typography>
        }
    }
    return (
        <Layout>
            {loading && <LinearProgress color="secondary" variant="query"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Typography sx={{color: 'text.primary', mb: 2}} variant="h4">
                        Bookings
                    </Typography>
                    <Grid
                        spacing={2}
                        container={true}
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid item={true} xs={12} md={6}>
                            <Typography
                                sx={{color: 'text.primary'}}
                                variant="body1">
                                Filter Bookings
                            </Typography>
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
                    <Divider sx={{my: 3}} light={true} variant="fullWidth"/>
                    {error && <Alert title={error} severity="error">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>}
                    {bookings && bookings.length === 0 ? (
                        <Box sx={{
                            height: '30vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'background.paper'
                        }}>
                            <Typography
                                align="center"
                                sx={{color: 'text.secondary'}}
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
                                                            <Tooltip title={`View details of ${booking.container}`}>
                                                                <Visibility
                                                                    sx={{
                                                                        borderBottomRightRadius: 0,
                                                                        borderTopRightRadius: 12,
                                                                        borderBottomLeftRadius: 12,
                                                                        borderTopLeftRadius: 0,
                                                                        backgroundColor: 'light.green',
                                                                        fontSize: 28,
                                                                        padding: 0.4,
                                                                        color: 'colors.green'
                                                                    }}
                                                                    onClick={() => setSelectedViewBooking(booking)}/>
                                                            </Tooltip>

                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Tooltip title={`View details of ${booking.container}`}>
                                                                <Edit
                                                                    sx={{
                                                                        borderBottomRightRadius: 0,
                                                                        borderTopRightRadius: 12,
                                                                        borderBottomLeftRadius: 12,
                                                                        borderTopLeftRadius: 0,
                                                                        backgroundColor: 'light.secondary',
                                                                        fontSize: 28,
                                                                        padding: 0.4,
                                                                        color: 'secondary.main'
                                                                    }}
                                                                    onClick={() => setSelectedUpdateBooking(booking)}/>
                                                            </Tooltip>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Tooltip title={`View details of ${booking.container}`}>
                                                                <Delete
                                                                    sx={{
                                                                        borderBottomRightRadius: 0,
                                                                        borderTopRightRadius: 12,
                                                                        borderBottomLeftRadius: 12,
                                                                        borderTopLeftRadius: 0,
                                                                        backgroundColor: 'light.red',
                                                                        fontSize: 28,
                                                                        padding: 0.4,
                                                                        color: 'colors.red'
                                                                    }}
                                                                    onClick={() => setSelectedDeleteBooking(booking)}
                                                                />
                                                            </Tooltip>
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

                    {Boolean(selectedViewBooking) && (
                        <ViewBookingDialog
                            booking={selectedViewBooking}
                            open={Boolean(selectedViewBooking)}
                            handleClose={() => setSelectedViewBooking(null)}
                        />
                    )}

                    {Boolean(selectedUpdateBooking) && (
                        <UpdateBookingDialog
                            booking={selectedUpdateBooking}
                            open={Boolean(selectedUpdateBooking)}
                            handleClose={() => setSelectedUpdateBooking(null)}
                        />
                    )}

                    {Boolean(selectedDeleteBooking) && (
                        <DeleteDialog
                            confirmDelete={handleConfirmDeleteBooking}
                            message={`Are you sure you want to delete booking with container ${selectedDeleteBooking.container}`}
                            open={Boolean(selectedDeleteBooking)}
                            handleClose={() => setSelectedDeleteBooking(null)}
                        />
                    )}
                </Container>
            </Box>
        </Layout>
    )
}

export default BookingsPage;
