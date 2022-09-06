import {
    Box,
    Container, Grid,
    Typography,
} from "@mui/material";

import {useSelector} from "react-redux";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import InvitationResponse from "../../components/shared/invitation-response";
import InvitationForm from "../../components/shared/invitation-form";
import {useParams} from "react-router";
import InvitationAcknowledgment from "../../components/shared/invitation-acknowledgment";

const InvitationResponsePage = () => {

    const {page} = useSelector(selectInvitations);

    const {invitationID, code} = useParams();

    const renderPage = page => {
        switch (page) {
            case 0:
                return <InvitationResponse invitationID={invitationID}/>;
            case 1:
                return <InvitationForm invitationID={invitationID} code={code}/>;
            case 2:
                return <InvitationAcknowledgment code={code}/>;
            default:
                return <InvitationResponse invitationID={invitationID}/>;
        }
    }


    return (
        <Box sx={{backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <Grid container={true} justifyContent="center">
                <Grid item={true} xs={12} md={6}>
                    <Container maxWidth="sm" sx={{my: 3}}>
                        <Typography
                            mb={3}
                            sx={{
                                color: 'secondary.main',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}
                            gutterBottom={true}
                            align="center"
                            variant="h4">
                            Super Craft GH
                        </Typography>
                        {renderPage(page)}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InvitationResponsePage;
