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
    }, []);/* 
    doucment.getElementById('läschen',).addEventListener('click', () => {
        React.useEffect(() => {
            // DELETE request using axios inside useEffect React hook
            axios.delete('http://localhost:8080/api/tests/1')
                .then(() => console.log('Delete successful'));
        
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, []);
    }) */
    const deleteItem = (val) => {
        console.log('FUNZT')
        axios.delete('http://localhost:8080/api/tests/' + val)
                .then(() => console.log('Delete successful'));
    }
    return (
        <div className="admin_ansicht">
            <Grid container spacing={1}>
                <Typography marginTop={4} variant="h2">&nbsp;Admin-Ansicht des Kontaktanfragenformulars</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer  marginTop={5} component={Paper}>
                        <Table sx={{ minWidth: 'auto', minHeight: 'auto' }} aria-label="simple table">

                            <TableHead>
                            <TableRow>
                            <TableCell align="center" sx={ { border: 1 } }>
                                <div align="left"> <h5>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;Telefonnummer &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;Wunschzeiten &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hochgeladen am &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Löschen</h5></div></TableCell>
                            </TableRow>
                            </TableHead>
                                <TableBody>{rows.map((row) => (
                                        <TableRow key={row.name} sx={ { border: 2 } }>
                                            <TableCell>{row.calories}
                                                {post.map((i) => {
                                                    return (
                                                        <div align="left"  key={i.id}>
                                                            <h4>&nbsp;{i.id} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{i.Telefonnummer} &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {i.Wunschzeiten}  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; {i.createdAt}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                        <Buttons
                                                            align="left"
                                                            size="medium"
                                                            variant="outlined"
                                                            buttonText=""
                                                            endIcon={<DeleteIcon />}
                                                            handleClick={deleteItem(i.id)}
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
            {/* <button type="button" handleClick={läschen(28)}>Läschen</button> */}
        </div>
    );
}

export default Admin;
