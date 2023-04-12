import React, {useState} from "react";
import Header from "./header/header";
import DrawerContent from "./drawer/drawer-content";
import {Box, SwipeableDrawer} from "@mui/material";


const Layout = ({children}) => {

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
            <Box sx={{py: {xs: 7.5, lg: 8}}}>
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
