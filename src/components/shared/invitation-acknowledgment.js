import {Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import success from "./../../assets/images/success.png";
import React from "react";
const InvitationAcknowledgment = () => {
    return (
        <Box>
            <Container>
                <Card
                    sx={{
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 32,
                        borderBottomLeftRadius: 32,
                        borderTopLeftRadius: 0,
                    }} elevation={1} variant="elevation">
                    <CardContent>
                        <Typography variant="h4" align="center">Acknowledgement</Typography>

                        <Divider sx={{my: 2}} variant="fullWidth" light={true}/>

                        <Box mb={4}>
                            <Grid container={true} mb={4} justifyContent="center">
                                <Grid item={true}>
                                    <Avatar src={success} sx={{width: 40, height: 40}}/>
                                </Grid>
                            </Grid>

                            <Typography mb={2} gutterBottom={true} variant="h6" align="center">
                                Your details has been submitted successfully.
                            </Typography>

                            <Typography variant="body1" align="center">
                                Welcome aboard!!!
                            </Typography>
                        </Box>

                        <Grid container={true} justifyContent="center">
                            <Grid item={true} xs={12} md="auto">
                                <Link to="/auth/login" style={{textDecoration: 'none'}}>
                                    <Button
                                        sx={{
                                            textTransform: 'capitalize',
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 12,
                                            borderBottomLeftRadius: 12,
                                            borderTopLeftRadius: 0,
                                        }}
                                        size="large"
                                        variant="contained"
                                        disableElevation={true}
                                        fullWidth={true}>
                                        Proceed to login
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default InvitationAcknowledgment;
