/*import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

// SendButton color
const SendButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));
  
//ResetButton color
  const ResetButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    '&:hover': {
      backgroundColor: red[700],
    },
  }));
export default function Bottom(props) {
  return (
    <body>
    <div id="textfield">
    <TextField required id="filled-required" label="Required" defaultValue="Hello World" variant="filled"/>
    <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry."/>
    </div>
    <div id="buttons">
    <ResetButton variant="secondary" size="large" startIcon={<DeleteIcon />}>Reset</ResetButton>
    <SendButton variant="contained" size="large" endIcon={<SendIcon />}>Send</SendButton>
    </div>
    </body>
  );
} */