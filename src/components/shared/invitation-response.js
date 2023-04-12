import React from "react";
import {Alert, AlertTitle, Button, Card, CardContent, Grid, LinearProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import {INVITATION_ACTION_CREATORS} from "../../redux/invitations/invitation-action-creators";

const InvitationResponse = ({invitationID}) => {

   const dispatch = useDispatch();

    const {invitationLoading, invitationError} = useSelector(selectInvitations);

    return (
        <Card sx={{
            borderBottomRightRadius: 0,
            borderTopRightRadius: 32,
            borderBottomLeftRadius: 32,
            borderTopLeftRadius: 0,
        }} elevation={1}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <CardContent>
                {
                    invitationError && (
                        <Alert sx={{my: 3}} severity="error" color="error" variant="standard">
                            <AlertTitle>{invitationError}</AlertTitle>
                        </Alert>
                    )
                }
                <Typography mb={4} variant="h5" align="center">Invitation Response</Typography>
                <Typography mb={4} variant="body2" align="center">
                    You have been invited by Streaming Resource GH to sign up as an Admin
                </Typography>
                <Grid container={true} spacing={1} alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                            }}
                            color="error"
                            fullWidth={true}
                            onClick={() => dispatch(INVITATION_ACTION_CREATORS.rejectInvitation(invitationID))}
                            size="large"
                            variant="outlined">Reject</Button>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={() => dispatch(INVITATION_ACTION_CREATORS.nextPage())}
                            fullWidth={true}
                            size="large"
                            color="primary"
                            disableElevation={true}
                            sx={{
                                textTransform: 'capitalize',
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                            }}
                            variant="contained">Proceed</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default InvitationResponse;
