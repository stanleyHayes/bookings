import React from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import moment from "moment";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {INVITATION_ACTION_CREATORS} from "../../redux/invitations/invitation-action-creators";
import Layout from "../../components/layout";
import InviteAdminDialog from "../../components/dialogs/admin-invitation-dialog";

const InvitationsPage = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const {invitations, invitationLoading, invitationError} = useSelector(selectInvitations);

    const {token} = useSelector(selectAuth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(INVITATION_ACTION_CREATORS.getInvitations(token));
    }, [dispatch, token]);


    return (
        <Layout>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Grid container={true} justifyContent="space-between" spacing={2}>
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h4">Invitations</Typography>
                        </Grid>

                        <Grid item={true} xs={12} md="auto">
                            <Button
                                sx={{
                                    textTransform: 'capitalize',
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderTopLeftRadius: 0,
                                }}
                                onClick={() => setDialogOpen(true)}
                                size="medium"
                                color="secondary"
                                startIcon={<Add/>}
                                variant="contained"
                                fullWidth={true}>
                                Invite Admin
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider variant="fullWidth" light={true} sx={{my: 3}}/>

                    {invitationError && <Alert severity="error"><AlertTitle>{invitationError}</AlertTitle></Alert>}

                    {invitations && invitations.length === 0 ? (
                        <Box>
                            <TableContainer component={Paper}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Inviter</TableCell>
                                            <TableCell>Invitee</TableCell>
                                            <TableCell>Code</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Expiry Created</TableCell>
                                            <TableCell>Date Created</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                            <Box sx={{backgroundColor: 'background.paper'}} py={5}>
                                <Typography variant="body2" align="center">
                                    No invitations available
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Inviter</TableCell>
                                        <TableCell>Invitee</TableCell>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Expiry Created</TableCell>
                                        <TableCell>Date Created</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invitations && invitations.map((invitation, index) => {
                                            return (
                                                <TableRow hover={true} key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{invitation.inviter.name}</TableCell>
                                                    <TableCell>{invitation.email}</TableCell>
                                                    <TableCell>{invitation.code}</TableCell>
                                                    <TableCell>{invitation.status}</TableCell>
                                                    <TableCell>{moment(invitation.expiryDate).fromNow()}</TableCell>
                                                    <TableCell>{moment(invitation.updatedAt).fromNow()}</TableCell>
                                                    <TableCell>
                                                        <Grid
                                                            spacing={2}
                                                            container={true}
                                                            alignItems="center">
                                                            <Grid item={true}>
                                                                <Tooltip title="Edit Invitation">
                                                                    <Edit
                                                                        sx={{
                                                                            color: 'colors.blue',
                                                                            backgroundColor: 'light.blue',
                                                                            padding: 0.6,
                                                                            fontSize: 32,
                                                                            cursor: 'pointer',
                                                                            borderBottomRightRadius: 0,
                                                                            borderTopRightRadius: 12,
                                                                            borderBottomLeftRadius: 12,
                                                                            borderTopLeftRadius: 0,
                                                                        }}/>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item={true}>
                                                                <Tooltip title="Revoke Invitation">
                                                                    <Delete
                                                                        sx={{
                                                                            color: 'colors.red',
                                                                            backgroundColor: 'light.red',
                                                                            padding: 0.4,
                                                                            borderRadius: 0.6,
                                                                            fontSize: 32,
                                                                            cursor: 'pointer',
                                                                            borderBottomRightRadius: 0,
                                                                            borderTopRightRadius: 12,
                                                                            borderBottomLeftRadius: 12,
                                                                            borderTopLeftRadius: 0,
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {
                        dialogOpen &&
                        <InviteAdminDialog
                            open={dialogOpen}
                            handleClose={() => setDialogOpen(false)}
                        />
                    }
                </Container>
            </Box>
        </Layout>
    )
}

export default InvitationsPage;
