import {Button, Dialog, DialogActions, DialogContent, Grid, Stack, Typography} from "@mui/material";
import {WarningAmber} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const DeleteConformationDialog = ({open, handleClose, message, positiveAction}) => {
    const handleClick = () => {
        positiveAction();
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                    <WarningAmber color="secondary"/>
                </Stack>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true} xs={6}>
                        <Button
                            fullWidth={true}
                            onClick={handleClose}
                            size="large"
                            variant="outlined">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <LoadingButton
                            fullWidth={true}
                            onClick={handleClick}
                            size="large"
                            variant="outlined">
                            Delete
                        </LoadingButton>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConformationDialog;
