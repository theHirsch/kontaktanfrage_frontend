import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//Input defaults for the phone textfield with the materialUI component "TextField"
const Input = ({
    isError = false,
    id = '',
    defaultValue = '',
    value = '',
    handleChange = () => {},
    handleBlur = () => {},
    messageText = '',
    label = 'input',
    size = 'small',
    name = ''
}) => {
    return (
        <div>
            <TextField
                name={name}
                size={size}
                error={isError}
                id={id}
                label={label}
                defaultValue={defaultValue}
                helperText={messageText}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default Input;