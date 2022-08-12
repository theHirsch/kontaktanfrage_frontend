import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Buttons from '../components/Button/Buttons';
import axios from 'axios';
import TimeFormatter from '../components/Datum/Datum';
import './Admin.css';

function Admin() {

    function createData(Telefonnummer, Wunschzeiten, Hochgeladen, deleteAction) {
        return { Telefonnummer, Wunschzeiten, Hochgeladen, deleteAction };
    }
     
    const rows = [
        'id',
        'phonenumber',
        'time',
        'uploaded_at',
        'deletedAction'
    ];

// Get and Post data between db and view B
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

// Delete item (id) and log if successful 
    const deleteItem = (val) => {
    
        console.log('FUNZT')
        axios.delete('http://localhost:8080/api/tests/delete/' + val)
                .then(() => {
                    post.splice(post.findIndex(post => post.id === val), 1);

                    console.log('Delete successful')
                    window.location.reload();
                });
    }
/* 
    class TimeFormatter extends React.Component {
        formatter = new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              });
      
        render() {
          const dateString = "2019-10-30T14:01:59.689Z";
      
          return (
            <div>
              Using <code>Date.parse</code>: {this.formatter.format(Date.parse(dateString))}
              <br />
              <em>OR</em>
              <br />
              Using <code>new Date</code>: {this.formatter.format(new Date(dateString))}
            </div>
          );
        }
      }
 */
function datum (value) {
    
    let options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hours: 'numeric', minutes: 'numeric', seconds: 'numeric'};
    
    console.log(navigator.language);

    return (new Date(value).toLocaleDateString(navigator.language, options), new Date(value).toLocaleTimeString(navigator.language, options))
}
// View B (Admin) output (table)
    return (
        <div className="admin_ansicht">
            <Grid container spacing={1}>
                <Typography marginTop={4} variant="h2">&nbsp;Admin-Ansicht des Kontaktanfragenformulars</Typography>
                <Grid align="left" marginTop={6.5} variant="h7">&nbsp;(Admins brauchen kein CSS)</Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer  marginTop={5} component={Paper}>
                        <Table sx={{ minWidth: 'auto', minHeight: 'auto' }} aria-label="simple table">
                            <TableHead className="th_header">
                                <TableRow sx={{ bgcolor: '#ffafaf' }} id="header_row_id" key="header_row">
                                    <TableCell sx={{ border: 1 }}>
                                        ID
                                    </TableCell>
                                    <TableCell sx={ { border: 1 } }>
                                        Telefonnummer
                                    </TableCell>
                                    <TableCell sx={ { border: 1 } }>
                                        Wunschzeiten
                                    </TableCell>
                                    <TableCell sx={ { border: 1 } }>
                                        Hochgeladen am
                                    </TableCell>
                                    <TableCell sx={ { border: 1 } }>
                                        Löschen
                                    </TableCell>
                                </TableRow>
                            </TableHead>
{/* new row with new db input and delete button*/}
                                <TableBody>{post.map((i) => {
                                    return (
                                        <TableRow key={i.id} sx={ { border: 2 } }>
                                        <TableCell>
                                            {i.id}
                                        </TableCell>
                                        <TableCell>
                                            {i.Telefonnummer}
                                        </TableCell>
                                        <TableCell>
                                            {i.Wunschzeiten}
                                        </TableCell>
                                        <TableCell>
                                            {datum(i.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <Buttons
                                                align="left"
                                                size="medium"
                                                variant="outlined"
                                                buttonText="Löschen"
                                                handleClick={() => deleteItem(i.id)}
                                                type="button"
                                            /> 
                                        </TableCell>
                                    </TableRow>
                                    )
                                })}
                                </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default Admin;
