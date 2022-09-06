import {
    Alert, AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import validator from "validator";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/authentication/auth-reducer";
import {selectInvitations} from "../../redux/invitations/invitation-reducer";
import {INVITATION_ACTION_CREATORS} from "../../redux/invitations/invitation-action-creators";
import {Add} from "@mui/icons-material";

const InviteAdminDialog = ({open, handleClose}) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleChange = event => {
        setEmail(event.target.value);
    }

    const {token} = useSelector(selectAuth);
    const {invitationLoading, invitationError} = useSelector(selectInvitations);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!email) {
            setError("Email required");
            return;
        } else {
            setError("");
        }

        if (!validator.isEmail(email)) {
            setError("Email is invalid");
            return;
        } else {
            setError("");
        }
        dispatch(INVITATION_ACTION_CREATORS.createInvitation({email}, token, handleClose));
    }

    return (
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <DialogContent>
                {invitationError && <Alert severity="error"><AlertTitle>{invitationError}</AlertTitle></Alert>}
                <Typography mb={2} variant="h6" align="center">
                    Invite Admin
                </Typography>

                <Stack direction="column" spacing={1}>
                    <TextField
                        label="Email"
                        fullWidth={true}
                        name="email"
                        required={true}
                        variant="outlined"
                        value={email}
                        error={Boolean(error)}
                        helperText={error}
                        type="email"
                        size="small"
                        color="secondary"
                        onChange={handleChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
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
                            onClick={handleClose}
                            size="medium"
                            color="secondary"
                            variant="outlined"
                            fullWidth={true}>
                            Close
                        </Button>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopLeftRadius: 0,
                            }}
                            onClick={handleSubmit}
                            size="medium"
                            color="secondary"
                            startIcon={<Add/>}
                            variant="contained"
                            fullWidth={true}>
                            Invite
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default InviteAdminDialog;
