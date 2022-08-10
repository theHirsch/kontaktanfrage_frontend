import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Buttons from '../components/Button/Buttons';
import Input from '../components/Input/Input';
import axios from 'axios';

function Admin() {

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('id'),

    ];
    // get data
    const [post, setPost] = React.useState([]);

    const headers = {
        "Content-Type": "application/json",
    };
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/tests',
            headers: headers
        }).then((res) => {

            setPost(res.data);
            console.log(res.data, this.data);
        })
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <div className="admin_ansicht">
            {post.map((i) => {
                return (
                    <div key={i.id}>
                        <p>{i.Telefonnummer}</p>
                        <p>{i.Wunschzeiten}</p>
                        <p>{i.createdAt}</p>
                    </div>
                )
            })}
            <Grid container spacing={1}>
                <Typography variant="h1">Admin-Ansicht des Kontaktanfragenformulars</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right">Telefonnummer</TableCell>
                                    <TableCell align="right">Wunschzeiten</TableCell>
                                    <TableCell align="right">Hochgeladen am</TableCell>
                                    <TableCell align="right">Löschen</TableCell>
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
                <Grid container marginTop={4}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Buttons
                            size="medium"
                            variant="outlined"
                            buttonText=""
                            startIcon={<DeleteIcon />}
                            styles={{ width: '50%' }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Admin;
