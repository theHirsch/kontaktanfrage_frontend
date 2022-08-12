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
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import './Schedule.css';
import Modal from '../components/Modal/Modal';
import FormikErrorText from '../components/FormikErrorText/FormikErrorText';

const Schedule = ({}) => {

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
   })
     .catch((err) => { console.log(err) })
 }, []);
 const date = ['mo_8', 'mo_10']
 

    const [showModal, setShowModal] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const formik = useFormik({
        enableReinitialze: true,
        initialValues: {
            phonenumber: ''
        },
        validationSchema: Yup.object({
            phonenumber: Yup.string()
                .required('Telefonnummer vergessen')
                .test('regex', 'Bitte korrekte Telennummer eingeben', (val) => {
                    let regExp = new RegExp('^[0-9._+-]*$');

                    return regExp.test(val);
                })
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

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
        console.log(checkeddates);
        axios.post('http://localhost:8080/api/tests', {
          Telefonnummer: document.getElementById('phonenumber').value,
          Wunschzeiten: checkeddates.toString(),
          headers:{"Content-Type" : "application/json"}
        }).then((res) => {

          // open modal
          setShowModal(true)

          console.log(res)
        }).catch((err) => {console.log(err)});
    };
    // reset pickedslots|checkboxes & input field (telephone)
    const handleReset = () => {
      console.log("h");
        formik.setFieldValue('phonenumber', '');
        document.getElementById('phonenumber').value = '';
        setSelectedSlots([]);
    };

    function createData(timeSlot, montag, dienstag, mittwoch, donnerstag, freitag) {
        return { timeSlot, montag, dienstag, mittwoch, donnerstag, freitag };
    }

    const rows = [
        createData(
            '08:00-10:00',
            'Mo08:00-10:00',
            'Di08:00-10:00', 
            'Mi08:00-10:00',
            'Do08:00-10:00',
            'Fr08:00-10:00'
        ),
        createData(
            '10:00-12:00',
            'Mo10:00-12:00',
            'Di10:00-12:00',
            'Mi10:00-12:00',
            'Do10:00-12:00',
            'Fr10:00-12:00'
        ),
        createData(
            '12:00-14:00',
            'Mo12:00-14:00',
            'Di12:00-14:00',
            'Mi12:00-14:00',
            'Do12:00-14:00',
            'Fr12:00-14:00'
        ),
        createData(
            '14:00-16:00',
            'Mo14:00-16:00',
            'Di14:00-16:00',
            'Mi14:00-16:00',
            'Do14:00-16:00',
            'Fr14:00-16:00'
        ),
        createData(
            '16:00-18:00',
            'Mo16:00-18:00',
            'Di16:00-18:00',
            'Mi16:00-18:00',
            'Do16:00-18:00',
            'Fr16:00-18:00'
        ),
        createData(
            '18:00-20:00',
            'Mo18:00-20:00',
            'Di18:00-20:00',
            'Mi18:00-20:00',
            'Do18:00-20:00',
            'Fr18:00-20:00'
        )
    ];

    const handleCellClick = (e) => {
        let slot = e.target.innerText;

        if (selectedSlots.includes(slot)) {
            setSelectedSlots((prev) => prev.filter((item) => item !== slot));
        } else {
            setSelectedSlots((prev) => [...prev, slot]);
        }
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid id="containerH1" container spacing={0} sx={{ bgcolor: '' }}>
                    <Typography sx={{ fontfamily:'Roboto', fontstyle: 'bold'}} marginTop={1} variant="h2">Kontaktanfragenformular</Typography>
                  <Grid id="containerText" container spacing={1}>
                  <Typography sx={{ fontfamily:'Roboto', fontstyle: 'bold'}} marginTop={2} align="center" variant="h6" lg={12}>&nbsp;&nbsp;Bitte wählen Sie ihre Wunschkontaktzeiträume in der Tabelle aus, tragen Sie ihre Telefonnummer im dafür vorgesehenen Feld ein und klicken Sie auf absenden!</Typography>
                    <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ bgcolor: '#b4a4d9' }}>
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
                                                sx={{ bgcolor: '#000000' }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ bgcolor: '#bdffba', fontSize: 'medium' }}>
                                                    {row.timeSlot}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    // onClick={handleCellClick}
                                                    id={row.montag}
                                                    className={
                                                        selectedSlots.includes(row.montag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.montag} <input type="checkbox" name="date" value={row.montag}/>
                                                </TableCell>
                                                <TableCell
                                                
                                                    align="right"
                                                    // onClick={handleCellClick}
                                                    id={row.dienstag}
                                                    className={
                                                        selectedSlots.includes(row.dienstag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.dienstag}<input type="checkbox" name="date" value={row.dienstag}/>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    // onClick={handleCellClick}
                                                    id={row.mittwoch}
                                                    className={
                                                        selectedSlots.includes(row.mittwoch) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.mittwoch}<input type="checkbox" name="date" value={row.mittwoch}/>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    // onClick={handleCellClick}
                                                    id={row.donnerstag}
                                                    className={
                                                        selectedSlots.includes(row.donnerstag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.donnerstag}<input type="checkbox" name="date" value={row.donnerstag}/>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    // onClick={handleCellClick}
                                                    id={row.freitag}
                                                    className={
                                                        selectedSlots.includes(row.freitag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.freitag}<input type="checkbox" name="date" value={row.freitag}/>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid container marginTop={2} marginLeft={110} item xs={12} sm={12} md={12} lg={12}>
                        <Stack
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            spacing={2}
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
            <Modal
                isOpen={showModal}
                handleClose={() => setShowModal(false)}
                handleContinuePress={() => setShowModal(false)}
                isShowButtons
                showContinueBtn
                modalTilte="Gratulation!"
                modalDescription="Ihre Wunschzeiten wurden erfolgreich eingesendet !"
            />
        </>
    );
};

export default Schedule;