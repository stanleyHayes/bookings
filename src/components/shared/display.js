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
            caption: {
                textTransform: "uppercase",
                fontWeight: 700
            },
            containerNumber: {
                wordBreak: 'break-word'
            }
        }
    });

    const classes = useStyles();

    return (
        <Card variant="outlined" elevation={8} className={classes.card}>
            <CardContent>
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Divider color="primary" className={classes.shortDivider} variant="middle"/>
                    </Grid>
                </Grid>
                {currentDisplay ? (
                    <React.Fragment>
                        <Typography color="textPrimary" variant="h6" align="center" className={classes.caption}>
                            Container Number
                        </Typography>
                        <Divider variant="middle" light={true} className={classes.subDivider} />
                        <Typography className={classes.containerNumber} color="textPrimary" variant="h1" align="center">
                            {currentDisplay.container}
                        </Typography>
                        <Divider className={classes.divider} variant="fullWidth" light={true}/>
                        <Typography color="textPrimary" variant="h6" align="center" className={classes.caption}>
                            Booking Date
                        </Typography>
                        <Divider variant="middle" light={true} className={classes.subDivider} />
                        <Typography color="textPrimary" variant="h3" align="center">
                            {new Date(currentDisplay.date).toDateString()}
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography color="textPrimary" variant="h6" align="center">
                            No Booking Available
                        </Typography>
                    </React.Fragment>
                )}

                <Divider className={classes.divider} variant="fullWidth" light={true}/>
                <Typography color="textPrimary" variant="h6" align="center" className={classes.caption}>
                    Next
                </Typography>

                <Divider variant="middle" light={true} className={classes.subDivider} />

                {nextDisplay ?
                    <Typography className={classes.containerNumber} color="textPrimary" variant="h3" align="center">
                        {nextDisplay.container}
                    </Typography> :
                    <Typography color="textPrimary" variant="h6" align="center">
                        No Container Available Next
                    </Typography>
                }
            </CardContent>
        </Card>
    )
}

export default Display;