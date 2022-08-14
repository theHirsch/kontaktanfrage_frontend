// Imports data from components, .css file and libraries used for the Schedule View
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-phone-number-input/style.css";
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
import * as Yup from 'yup';
import "yup-phone-lite";
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import './Schedule.css';
import Modal from '../components/Modal/Modal';
import FormikErrorText from '../components/FormikErrorText/FormikErrorText';

// Full Schedule View 
const Schedule = ({}) => {

// Get data from backend here, thanks Axios

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
   })
     .catch((err) => { console.log(err) })
 }, []);
 
// Validation with formik-bib for the phonenumber input (components/FormikErrorText)
    const [showModal, setShowModal] = useState(false);
    const valid = 0;
    const [selectedSlots, setSelectedSlots] = useState([]);

    const formik = useFormik({
        enableReinitialze: true,
        initialValues: {
            phonenumber: ''
        },
        validationSchema: Yup.object({
            phonenumber: Yup.string()
            .phone("DE", "Bitte gebe ein gültige Telefonnummer ein.")
            .required('Telefonnummer vergessen')
            .min(4, 'Zu kurz!'),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values)
            handleSubmit(values);
        },
    });


/*   //  Kläglicher Versuch mithilfe des Abrufens nach Wochentagen und nicht Uhrzeiten zu sortieren in den Wunschzeiten

        const handleSubmit = (values) => {
        // API call
        console.log(values);
        const dates = document.querySelectorAll('input[name="date"]')
        const checkeddates = []
        for (let i = 0; i < dates.length; i++) {
          if(i <= 5) {
            console.log(dates[i*5])
            if (dates[i*5].checked) {
              checkeddates.push(dates[i*5].value)
            }
          }
          if (5 < i <= 10) {
            console.log(dates[(i-6) *5 + 1])
            if (dates[(i-6) *5 + 1].checked) {
              checkeddates.push(dates[(i-6) *5 + 1].value)
            }
          }
          if (10 < i <= 15) {
            console.log(dates[(i-11) *5 + 2])
          }
          if (15 < i <= 20) {
            console.log(dates[(i-16) *5 + 3])
          }
          if (20 < i <= 25) {
            console.log(dates[(i-21) *5 + 4])
          }
          if (dates[i].checked) {
            checkeddates.push(dates[i].value)
          }
        }

        console.log(checkeddates);
        axios.post('http://localhost:8080/api/tests', {
          Telefonnummer: document.getElementById('phonenumber').value,
          Wunschzeiten: checkeddates.toString(),
          headers:{"Content-Type" : "application/json"}
        }).then((res) => { */

// Send data (checked input checkboxes (filled with the created data)) to api and show the modal when clicking the "Send" button
        const handleSubmit = (values) => {
            // API call
            console.log(values);
            const dates = document.querySelectorAll('input[name="date"]')
            const checkeddates = []
            for (let i = 0; i < dates.length; i++) {
              if (dates[i].checked) {
                checkeddates.push(dates[i].value)
              }
            }

            if (checkeddates.length > 0) {
                console.log(checkeddates);
                axios.post('http://localhost:8080/api/tests', {
                  Telefonnummer: document.getElementById('phonenumber').value,
                  Wunschzeiten: checkeddates.toString(),
                  headers:{"Content-Type" : "application/json"}
                }).then((res) => {           
    
// Open modal (modal in components)
              setShowModal(true)
    
                console.log(res)
                 }).catch((err) => {console.log(err)});
            }
    };
// Reset for pickedslots|checkboxes & input field (telephone)
    const handleReset = () => {
      console.log("h");
        formik.setFieldValue('phonenumber', formik.initialValues.phonenumber);
        setSelectedSlots([]);
        formik.setTouched({}, false);
    };
// Create data for table-rows.. 
    function createData(timeSlot, montag, dienstag, mittwoch, donnerstag, freitag) {
        return { timeSlot, montag, dienstag, mittwoch, donnerstag, freitag };
    }
// ..and how to save them in the backend (no spaces for shorter )
    const rows = [
        createData(
            '08:00-10:00',
            ' Mo08:00-10:00',
            ' Di08:00-10:00', 
            ' Mi08:00-10:00',
            ' Do08:00-10:00',
            ' Fr08:00-10:00'
        ),
        createData(
            '10:00-12:00',
            ' Mo10:00-12:00',
            ' Di10:00-12:00',
            ' Mi10:00-12:00',
            ' Do10:00-12:00',
            ' Fr10:00-12:00'
        ),
        createData(
            '12:00-14:00',
            ' Mo12:00-14:00',
            ' Di12:00-14:00',
            ' Mi12:00-14:00',
            ' Do12:00-14:00',
            ' Fr12:00-14:00'
        ),
        createData(
            '14:00-16:00',
            ' Mo14:00-16:00',
            ' Di14:00-16:00',
            ' Mi14:00-16:00',
            ' Do14:00-16:00',
            ' Fr14:00-16:00'
        ),
        createData(
            '16:00-18:00',
            ' Mo16:00-18:00',
            ' Di16:00-18:00',
            ' Mi16:00-18:00',
            ' Do16:00-18:00',
            ' Fr16:00-18:00'
        ),
        createData(
            '18:00-20:00',
            ' Mo18:00-20:00',
            ' Di18:00-20:00',
            ' Mi18:00-20:00',
            ' Do18:00-20:00',
            ' Fr18:00-20:00'
        )
    ];

// Table with Tablehead for the weekdays and Tablebody for the time (TableRow) and clickable Checkboxes for the user
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid id="containerH1" container spacing={0} sx={{height: '80%', width: '80%' }}>
                    <Typography sx={{fontfamily:'Roboto+Mono', fontstyle: 'bold'}} marginTop={1} variant="h2">Kontaktanfragenformular</Typography>
                  <Grid id="containerText" container spacing={1}>
                  <Typography sx={{ fontfamily:'Roboto', fontstyle: 'bold'}} marginTop={2} align="center" variant="h6">&nbsp;Bitte wählen Sie per Klick ihre Wunschkontaktzeiträume in der Tabelle aus (max.15), tragen Sie ihre Telefonnummer im dafür vorgesehenen Feld ein und klicken Sie auf absenden! Ein Kundendienstmitarbeiter wird sich dann telefonisch bei Ihnen melden.</Typography>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ bgcolor: '#a4bef2' }}>
                                    <TableRow align="center">
                                        <TableCell
                                        sx={{fontSize: 'medium'}} align="center" id="Montag">
                                            Uhrzeit
                                        </TableCell>
                                        <TableCell sx={{fontSize: 'medium'}} align="center" id="Montag">
                                            Montag
                                        </TableCell>
                                        <TableCell sx={{fontSize: 'medium'}} align="center" id="Dienstag">
                                            Dienstag
                                        </TableCell>
                                        <TableCell sx={{fontSize: 'medium'}} align="center" id="Mittwoch">
                                            Mittwoch
                                        </TableCell>
                                        <TableCell sx={{fontSize: 'medium'}} align="center" id="Donnerstag">
                                            Donnerstag
                                        </TableCell>
                                        <TableCell sx={{fontSize: 'medium'}} align="center" id="Freitag">
                                            Freitag
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => {
                                        return (
                                            <TableRow 
                                                align="center"
                                                key={row.timeSlot}
                                                sx={{ bgcolor: ' ' }}
                                            >
                                                <TableCell align="center" component="th" scope="row" sx={{ bgcolor: '#bdffba', fontSize: 'medium' }}>
                                                    {row.timeSlot}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                    id={row.montag}
                                                    className={
                                                        selectedSlots.includes(row.montag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    <span className="hidden">{row.montag}</span> <input type="checkbox" name="date" value={row.montag}/>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    id={row.dienstag}
                                                    className={
                                                        selectedSlots.includes(row.dienstag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                   <span className="hidden">{row.dienstag}</span><input type="checkbox" name="date" value={row.dienstag}/>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    id={row.mittwoch}
                                                    className={
                                                        selectedSlots.includes(row.mittwoch) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                   <span className="hidden">{row.mittwoch}</span><input type="checkbox" name="date" value={row.mittwoch}/>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    id={row.donnerstag}
                                                    className={
                                                        selectedSlots.includes(row.donnerstag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                   <span className="hidden">{row.donnerstag}</span><input type="checkbox" name="date" value={row.donnerstag}/>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    id={row.freitag}
                                                    className={
                                                        selectedSlots.includes(row.freitag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                   <span className="hidden">{row.freitag}</span><input type="checkbox" name="date" value={row.freitag}/>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
{/** Grid for the telephone Input (components/Input) and the two Buttons "Reset" and "Send" (components/Button) */}
                    <Grid alignItems="center" marginTop={2} marginLeft={70} item xs={6} sm={6} md={6} lg={6}>
                        <Stack
                            align="center"
                            direction="row"
                            alignItems="center"
                            spacing={6}
                        >
                            <Typography variant="h6">
                                Ihre Telefonnummer:
                            </Typography>
                            <div>
                                <Input 
                                    id= "phonenumber"
                                    label="Tel."
                                    name="phonenumber"
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    value={formik.values.phonenumber}
                                />
                                <FormikErrorText formikInstance={formik} fieldName="phonenumber" />
                            </div>
                        </Stack>
                    </Grid>

                    <Grid container marginTop={4}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Button 
                        sx={{ color: '#c30001' }}
                        type ="reset" 
                        variant="outlined" 
                        startIcon={<DeleteIcon />} 
                        onClick={handleReset}
                        >Zurücksetzen  
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Stack
                                direction="row"
                                justifyContent="right"
                                alignItems="center"
                                spacing={2}
                            >
                                <Buttons
                                    id="submitButton"
                                    size="medium"
                                    variant="contained"
                                    isDisabled={(!formik.dirty || !formik.isValid)}
                                    buttonText="Absenden"
                                    endIcon={<SendIcon />}
                                    styles={{ width: '50%' }}
                                    handleClick={handleSubmit}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </form>
{/** Modal popping up when a successfull request (slot picked & phonevalidation) where send after clicking the "Send" button */}
            <Modal
                isOpen={showModal}
                handleClose={() => setShowModal(false)}
                handleContinuePress={() => setShowModal(false) /*window.location.reload()*/}
                isShowButtons
                showContinueBtn
                modalTilte="Gratulation!"
                modalDescription="Ihre Wunschzeiten wurden erfolgreich eingesendet !"
            />
        </>
    );
};
export default Schedule;