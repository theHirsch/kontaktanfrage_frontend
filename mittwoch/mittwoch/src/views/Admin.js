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
import Buttons from '../components/Button/Buttons';
import axios from 'axios';
import './Admin.css';

function Admin() {

    function createData(Telefonnummer, Wunschzeiten, Hochgeladen, löschen) {
        return { Telefonnummer, Wunschzeiten, Hochgeladen, löschen };
    }

    const rows = [
        createData(''),

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
            <Grid container spacing={1}>
                <Typography marginTop={4} variant="h2">Admin-Ansicht des Kontaktanfragenformulars</Typography>
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'}>
                    <TableContainer  marginTop={6} component={Paper}>
                        <Table align="right" sx={{ minWidth: 'auto' }} aria-label="simple table">
                       
                            <TableHead marginTop={6}> Telefonnummer &nbsp;&nbsp; Wunschzeiten &nbsp;&nbsp; Hochgeladen am &nbsp;&nbsp; Löschen </TableHead>
                                <TableBody>{rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell>{row.calories}
                                                {post.map((i) => {
                                                    return (
                                                        <div align="left"  key={i.id}>
                                                            <h4>{i.Telefonnummer}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {i.Wunschzeiten}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {i.createdAt}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                                                            <Buttons
                                                            align="left"
                                                            size="medium"
                                                            variant="outlined"
                                                            buttonText=""
                                                            endIcon={<DeleteIcon />}
                                                            />
                                                            </h4>
                                                        </div>
                                                    );
                                                })}
                                            </TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default Admin;
