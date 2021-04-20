import {Button, Grid, makeStyles, Toolbar} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

const MobileHeader = ({handleDrawerOpen}) => {

    const useStyles = makeStyles(() => {
        return {
            link: {
                textDecoration: "none"
            },
            button: {
                fontWeight: 700
            },
            hamburger: {
                width: 50,
                height: 30
            },
            brand: {
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: 24
            },
            role: {
                textTransform: "uppercase",
                fontWeight: 700
            }
        }
    });

    const classes = useStyles();

    return (
        <Toolbar>
            <Grid container={true} justify="space-between" alignItems="center">
                <Grid item={true} xs={2}>
                    <img
                        onClick={handleDrawerOpen}
                        className={classes.hamburger}
                        src="/assets/lightingcolored.svg"
                        alt="zeus lighting bolt"
                        title="zeus lighting bolt"/>
                </Grid>
                <Grid item={true} xs={8}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.brand} variant="text">Zeus</Button>
                    </Link>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;