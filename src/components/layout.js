import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import Header from "./header/header";


const Layout = ({children}) => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                background: "#0b0c10",
                minHeight: '100vh'
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Box>
            <Header/>
            <Box className={classes.container}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout;