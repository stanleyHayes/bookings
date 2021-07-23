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
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectBookings} from "../../redux/bookings/booking-reducer";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {getBookings} from "../../redux/bookings/booking-action-creators";
import {Alert} from "@material-ui/lab";
import {green, grey, red} from "@material-ui/core/colors";
import moment from "moment";
import {Delete, Edit, Visibility} from "@material-ui/icons";

const BookingsPage = () => {

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
                color: 'white'
            },
            deleted: {
                backgroundColor: red['600'],
                fontWeight: 'bold',
                color: 'white'
            },
            pending: {
                backgroundColor: grey['600'],
                fontWeight: 'bold',
                color: 'white'
            }
        }
    });

    const classes = useStyles();

    const {loading, error, bookings} = useSelector(selectBookings);
    const {loading: authLoading, token} = useSelector(selectAuth);

    const history = useHistory();
    const dispatch = useDispatch();

    const [status, setStatus] = useState("ALL");
    const handleStatusChange = e => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        if (!authLoading && !token) {
            history.push('/auth/login');
        }
    }, [authLoading, history, token]);


    useEffect(() => {
        dispatch(getBookings(token));
    }, [dispatch, token]);

    const renderStatus = status => {
        switch (status) {
            case 'PENDING':
                return <Typography variant="body2" className={classes.pending}>
                    {status}
                </Typography>
            case 'DELETED':
                return <Typography variant="body2" className={classes.deleted}>
                    {status}
                </Typography>
            case 'COMPLETED':
                return <Typography variant="body2" className={classes.completed}>
                    {status}
                </Typography>
            default:
                return <Typography variant="body2" className={classes.pending}>
                    {status}
                </Typography>
        }
    }
    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                <Typography color="textPrimary" variant="h3" align="center">Bookings</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                <Grid spacing={4} container={true} justify="space-between" alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <Typography color="textPrimary" variant="h6">Filter by Status</Typography>
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
                        </Select>
                    </Grid>
                </Grid>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                {loading && <LinearProgress color="secondary" variant="query"/>}
                {error && <Alert title={error} severity="error">{error}</Alert>}
                {!loading && bookings && bookings.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            className={classes.noBookingsText}
                            variant="h5">
                            No Bookings Available
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow hover={true}>
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
                                {bookings.map((booking, index) => {
                                    return (
                                        <TableRow hover={true}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{booking.container}</TableCell>
                                            <TableCell>{booking.car}</TableCell>
                                            <TableCell>{renderStatus(booking.status)}</TableCell>
                                            <TableCell>{moment(booking.date).fromNow()}</TableCell>
                                            <TableCell>new Date(booking.time).toLocaleTimeString()</TableCell>
                                            <TableCell>
                                                <Grid container={true} spacing={1} alignItems="center">
                                                    <Grid item={true}>
                                                        <Visibility className={classes.visibility}/>
                                                    </Grid>
                                                    <Grid item={true}>
                                                        <Edit className={classes.edit}/>
                                                    </Grid>
                                                    <Grid item={true}>
                                                        <Delete className={classes.delete}/>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Layout>
    )
}

export default BookingsPage;