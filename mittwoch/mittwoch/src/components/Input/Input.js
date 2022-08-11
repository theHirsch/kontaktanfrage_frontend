import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = ({
    isError = false,
    id = '',
    defaultValue = '',
    value = '',
    handleChange = () => {},
    messageText = '',
    label = 'input',
    size = 'medium'
}) => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    size={size}
                    error={isError}
                    id={id}
                    label={label}
                    defaultValue={defaultValue}
                    helperText={messageText}
                />
            </div>
        </Box>
    );
};

export default Input;
