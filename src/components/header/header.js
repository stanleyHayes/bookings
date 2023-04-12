import React from "react";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import {AppBar, Box} from "@mui/material";

const Header = ({handleDrawerOpen}) => {

    return (
        <AppBar variant="elevation" square={true} sx={{backgroundColor: "background.default"}}>
            <Box sx={{display: {xs: 'none', lg: 'block'}}}>
                <DesktopHeader />
            </Box>

            <Box sx={{display: {xs: 'block', lg: 'none'}}}>
                <MobileHeader handleDrawerOpen={handleDrawerOpen} />
            </Box>
        </AppBar>
    )
}

export default Header;
