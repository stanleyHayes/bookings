import React, {useState} from "react";
import {Box, makeStyles, SwipeableDrawer} from "@material-ui/core";
import Header from "./header/header";
import DrawerContent from "./drawer/drawer-content";


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

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <Box>
            <Header handleDrawerOpen={handleDrawerOpen}/>
            <Box className={classes.container}>
                {children}
            </Box>
            <SwipeableDrawer
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                open={open}>
                <DrawerContent handleDrawerClose={handleDrawerClose}/>
            </SwipeableDrawer>
        </Box>
    )
}

export default Layout;