import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, makeStyles, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const DeleteDialog = ({open, handleClose, confirmDelete, message}) => {

    const useStyles = makeStyles(theme => {
        return {
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            cancelButton: {},
            title: {
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
            deleteButton: {
                backgroundColor: red['900'],
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                    color: red['900'],
                    backgroundColor: 'white',
                }
            }
        }
    });

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">Caution</Typography>
                <Typography variant="body2" align="center">{message}</Typography>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider}/>
            <DialogActions>
                <Button className={classes.cancelButton} variant="text" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className={classes.deleteButton} variant="outlined" onClick={confirmDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;
