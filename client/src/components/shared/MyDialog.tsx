import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

interface MyDialogProps {
    dialogTitle: string;
    dialogText: string;
    isDialogOpen: boolean;
    confirmText?: string;
    handleClose: () => void;
    handleConfirm: () => void;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const MyDialog: React.FC<MyDialogProps> = (props) => {
    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleConfirm} color={props.color} autoFocus>
                    {props.confirmText || 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyDialog;
