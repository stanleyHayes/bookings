import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, Typography} from "@mui/material";

const DeleteDialog = ({open, handleClose, confirmDelete, message}) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography gutterBottom={true} variant="h6" align="center">Caution</Typography>
                <Typography variant="body2" align="center">{message}</Typography>
            </DialogContent>
            <Divider variant="fullWidth"/>
            <DialogActions>
                <Button
                    sx={{
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderTopLeftRadius: 0
                    }} color="secondary" variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    sx={{
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderTopLeftRadius: 0
                    }} color="error" variant="contained" onClick={confirmDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;
