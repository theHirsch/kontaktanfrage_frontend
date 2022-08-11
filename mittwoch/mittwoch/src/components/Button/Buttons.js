
import React from 'react';
import Button from '@mui/material/Button';

const Buttons = ({
    variant = 'text',
    id="submitButton",
    buttonText = 'Button Text',
    isDisable = true,
    size = 'small',
    startIcon = null,
    endIcon = null,
    type = 'submit',
    styles = {},
    handleClick = () => {}
}) => {
    return (
        <Button
            type={type}
            sx={styles}
            size={size}
            variant={variant}
            onClick={handleClick}
            startIcon={startIcon}
            endIcon={endIcon}
            id={id}
        >
            {buttonText}
        </Button>
    );
};

export default Buttons;