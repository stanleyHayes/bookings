import React from "react";
import {Card, CardContent, Divider, Grid, makeStyles, Typography} from "@material-ui/core";


const Display = ({currentDisplay, nextDisplay}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                marginLeft: 16,
                marginRight: 16
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            shortDivider: {
                marginTop: 32,
                marginBottom: 32,
                width: 60,
                height: 3
            },
            subDivider: {
                marginTop: 8,
                marginBottom: 8
            },
            title: {
                textTransform: "uppercase",
                fontWeight: 600
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
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Divider color="primary" className={classes.shortDivider} variant="middle" />
                    </Grid>
                </Grid>
                <Typography color="textPrimary" variant="h6" align="center" className={classes.caption}>
                    Container Number
                </Typography>
                <Typography color="textPrimary" variant="h1" align="center">
                    {currentDisplay.container}
                </Typography>
                <Divider className={classes.divider} variant="fullWidth" light={true} />
                <Typography  color="textPrimary" variant="h6" align="center" className={classes.caption}>
                    Booking Date
                </Typography>
                <Typography color="textPrimary" variant="h3" align="center">
                    {new Date(currentDisplay.date).toDateString()}
                </Typography>
                <Divider className={classes.divider} variant="fullWidth" light={true} />
                <Typography color="textPrimary" variant="h6" align="center" className={classes.caption}>
                    Next
                </Typography>
                {nextDisplay ?
                    <Typography color="textPrimary" variant="h3" align="center">
                        {nextDisplay.container}
                    </Typography>:
                    <Typography color="textPrimary" variant="h3" align="center">
                        No Container Available Next
                    </Typography>
                }
            </CardContent>
        </Card>
    )
}

export default Display;