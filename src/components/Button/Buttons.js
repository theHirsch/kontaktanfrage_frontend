import React from 'react';
import Button from '@mui/material/Button';

// Button defaults for the materialUI component "Button"
const Buttons = ({
    variant = 'text',
    buttonText = 'Button Text',
    isDisable = false,
    size = 'small',
    startIcon = null,
    endIcon = null,
    styles = {},
    handleClick = () => {}
}) => {
    return (
        <Button
            sx={styles}
            size={size}
            disabled={isDisable}
            variant={variant}
            onClick={handleClick}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {buttonText}
        </Button>
    );
};

export default Buttons;
