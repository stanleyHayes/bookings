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
                background: "#efefefef",
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

    const [booking, setBooking] = useState({});
    const [error, setError] = useState({});
    const {car, contact, name, container, company, time, date, product} = booking;

    const handleBookingChange = e => {
        setBooking({...booking, [e.target.name]: e.target.value});
    }

    const handleBookingSubmit = e => {
        e.preventDefault();
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant="h1" align="center">Create Booking</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={6}>
                        <Typography  className={classes.title}  variant="h5" align="center">
                            New Arrival
                        </Typography>

                        <Divider variant="fullWidth" className={classes.subDivider} light={true} />

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


                                <Button
                                    className={classes.button}
                                    onClick={handleBookingSubmit}
                                    variant="contained"
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