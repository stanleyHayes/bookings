import {Box, CircularProgress, Container, LinearProgress, Stack, Typography} from "@mui/material";
import React from "react";

const Splash = () => {
    return (
        <React.Fragment>
            <LinearProgress color="secondary" variant="query"/>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    height: '100vh',
                    maxHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                }}>
                <Container>
                    <Typography color="secondary" mb={4} gutterBottom={true} align="center" variant="h4">
                        Streaming Resource GH
                    </Typography>
                    <Typography mb={2} gutterBottom={true} align="center" variant="h6">
                        Setting up account
                    </Typography>
                    <Typography mb={2} gutterBottom={true} align="center" variant="body2">
                        Please wait...
                    </Typography>
                    <Stack direction="row" justifyContent="center">
                        <CircularProgress color="secondary"/>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Splash;
