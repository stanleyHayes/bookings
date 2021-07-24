import React from "react";
import {Button, Card, CardActions, CardContent, Divider, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const Booking = ({booking}) => {

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
            },
            caption: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            link: {
                textDecoration: "none",
                width: '100%',
                display: "inline-block"
            }
        }
    });

    const classes = useStyles();
    return (
        <Card variant="outlined" elevation={1}>
            <CardContent>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Container
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                    gutterBottom={true}>
                    {booking.container}
                </Typography>
                <Divider variant="textPrimary" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Product Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.product}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Company Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.company}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Driver's Contact
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.contact}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Driver's Name
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.name}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Car Number
                </Typography>
                <Typography color="textPrimary" variant="h6" gutterBottom={true}>{booking.car}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking date
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.date).toDateString()}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking Time
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {new Date(booking.time).toLocaleTimeString()}
                </Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography
                    color="textPrimary"
                    variant="caption"
                    className={classes.caption}>
                    Booking Status
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h6"
                    gutterBottom={true}>
                    {booking.status}
                </Typography>
            </CardContent>
            <Divider variant="fullWidth" className={classes.subDivider} light={true}/>
            <CardActions>
                <Link className={classes.link} to={`/bookings/${booking._id}/update`}>
                    <Button fullWidth={true} variant="outlined" size="large" className={classes.button}>
                        Update Booking
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default Booking;