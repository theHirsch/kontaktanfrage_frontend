import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Modal defaults for the modal-component from the materialUI-lib
const Modal = ({
    isShowButtons = false,
    isOpen = false,
    showCancelBtn = false,
    showContinueBtn = false,
    modalTilte = 'Title here',
    modalDescription = 'Description here...',
    cancelBtnText = 'Cancel',
    continueBtnText = 'Ok',
    handleClose = () => {},
    handleContinuePress = () => {},
    handleCancelPress = () => {}
}) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{modalTilte}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalDescription}
                    </DialogContentText>
                </DialogContent>
                {isShowButtons && (
                    <DialogActions>
                        {showCancelBtn && (
                            <Button variant="outlined" onClick={handleCancelPress}>
                                {cancelBtnText}
                            </Button>
                        )}
                        {showContinueBtn && (
                            <Button variant="contained" onClick={handleContinuePress} autoFocus>
                                {continueBtnText}
                            </Button>
                        )}
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
};

export default Modal;