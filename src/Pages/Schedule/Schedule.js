import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '../../components/Input/Input';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Buttons from '../src/components/Button/Buttons';

const Schedule = ({}) => {

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('08:00 - 10:00'),
        createData('10:00 - 12:00'),
        createData('12:00 - 14:00'),
        createData('14:00 - 16:00'),
        createData('16:00 - 18:00'),
        createData('18:00 - 20:00')
    ];

    return (
        <Grid container spacing={1}>
            <Typography variant="h4">Kontaktanfragenformular</Typography>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">Montag</TableCell>
                                <TableCell align="right">Dienstag</TableCell>
                                <TableCell align="right">Mittwoch</TableCell>
                                <TableCell align="right">Donnerstag</TableCell>
                                <TableCell align="right">Freitag</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack direction="row" justifyContent="right" alignItems="center" spacing={2}>
                    <Typography variant="overline" display="block">
                        Telefonnummer:
                    </Typography>
                    <Input label="Tel." />
                </Stack>
            </Grid>

            <Grid container marginTop={4}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Buttons
                        size="medium"
                        variant="outlined"
                        buttonText="Zurücksetzen"
                        startIcon={<DeleteIcon />}
                        styles={{ width: '50%'}} 
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Stack direction="row" justifyContent="right" alignItems="center" spacing={2}>
                        <Buttons
                            size="medium"
                            variant="contained"
                            buttonText="Absenden"
                            endIcon={<SendIcon />}
                            styles={{ width: '50%' }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Schedule;
