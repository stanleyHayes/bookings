import React from "react";
import {Card, CardContent, Divider, makeStyles, Typography} from "@material-ui/core";

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
            }
        }
    });

    const classes = useStyles();

    return (
        <Card variant="elevation" elevation={1}>
            <CardContent>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Container</Typography>
                <Typography color="textSecondary" variant="h4" gutterBottom={true}>{booking.container}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Product
                    Name</Typography>
                <Typography color="textSecondary" variant="h6" gutterBottom={true}>{booking.product}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Company
                    Name</Typography>
                <Typography color="textSecondary" variant="h6" gutterBottom={true}>{booking.company}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Driver's
                    Contact</Typography>
                <Typography color="textSecondary" variant="h6" gutterBottom={true}>{booking.contact}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Driver's
                    Name</Typography>
                <Typography color="textSecondary" variant="h6" gutterBottom={true}>{booking.name}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Car Number</Typography>
                <Typography color="textSecondary" variant="h6" gutterBottom={true}>{booking.car}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Booking
                    date</Typography>
                <Typography color="textSecondary" variant="h4" gutterBottom={true}>{booking.date}</Typography>
                <Divider variant="fullWidth" light={true} className={classes.subDivider}/>
                <Typography color="textSecondary" variant="caption" className={classes.caption}>Booking
                    Time</Typography>
                <Typography color="textSecondary" variant="h4" gutterBottom={true}>{booking.time}</Typography>
            </CardContent>
        </Card>
    )
}

export default Booking;