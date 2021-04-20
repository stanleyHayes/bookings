import React from "react";
import {Card, CardContent, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {Grade} from "@material-ui/icons";


const Display = ({booking}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                marginLeft: 32,
                marginRight: 32
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            shortDivider: {
                marginTop: 32,
                marginBottom: 32,
                width: 40,
                height: 3
            },
            subDivider: {
                marginTop: 8,
                marginBottom: 8
            },
            title: {
                textTransform: "uppercase"
            },
            caption:{
                textTransform: "uppercase",
                fontWeight:700
            }
        }
    });

    const classes = useStyles();

    return (
        <Card variant="elevation" elevation={8} className={classes.card}>
            <CardContent>
                <Typography variant="h6" align="center">Affixing Now</Typography>
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Divider className={classes.shortDivider} variant="middle" />
                    </Grid>
                </Grid>
                <Typography color="textSecondary" variant="h6" align="center" className={classes.caption}>Container Number</Typography>
                <Typography color="textPrimary" variant="h1" align="center">{booking.container}</Typography>
                <Divider className={classes.divider} variant="fullWidth" light={true} />
                <Typography color="textSecondary" variant="h6" align="center" className={classes.caption}>Booking Date</Typography>
                <Typography variant="h3" align="center">{new Date(booking.date).toLocaleDateString()}</Typography>
                <Divider className={classes.divider} variant="fullWidth" light={true} />
                <Typography color="textSecondary" variant="h6" align="center" className={classes.caption}>Next</Typography>
                <Typography variant="h3" align="center">{booking.container}</Typography>
            </CardContent>
        </Card>
    )
}

export default Display;