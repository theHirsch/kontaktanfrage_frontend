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

import './Schedule.css';
import Modal from '../components/Modal/Modal';
import FormikErrorText from '../components/FormikErrorText/FormikErrorText';

/* const Schedule = () => {

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


   const { phone } = this.state;
  const isEnabled = phone.length > 3; 

  return (
    <div>
      {post.map(i => <p key={i.id}>{i.Telefonnummer}</p>)}
      {date.map(j => <input type="checkbox" name={j} value={j} />)}
      <Grid container spacing={1} marginTop={4}>
        <Typography variant="h1">Kontaktanfragenformular</Typography>
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
                    
                      {date.map((j) => {
                      if(j === 'mo_10') {
                        console.log(j)
                        return (
                      <p key={j}></p>
                      )
                      }
                      return (<p key={j}>{j}</p>)
                  
                    })} 
                    <TableCell align="right">{row.carbs}{date.map(j => <input type="checkbox" name={j} value={j} />)}</TableCell>
                    <TableCell align="right">{row.protein}{date.map(j => <input type="checkbox" name={j} value={j} />)}</TableCell>
                    <TableCell align="right">{row.fat}{date.map(j => <input type="checkbox" name={j} value={j} />)}</TableCell>
                    <TableCell align="right">{row.carbs2}{date.map(j => <input type="checkbox" name={j} value={j} />)}</TableCell>
                    <TableCell align="right">{row.protein2}{date.map(j => <input type="checkbox" name={j} value={j} />)}</TableCell>
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
            <Input label="Tel." type="tel"/>
          </Stack>
        </Grid>

        <Grid container marginTop={4}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Buttons
              size="large"
              variant="outlined"
              buttonText="Zurücksetzen"
              startIcon={<DeleteIcon />}
              styles={{ width: '50%' }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack direction="row" justifyContent="right" alignItems="center" spacing={2}>
              <Buttons
              // disabled={!isEnabled}
                size="large"
                variant="contained"
                buttonText="Absenden"
                endIcon={<SendIcon />}
                styles={{ width: '50%' }}
                
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};


export default Schedule; */

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
              .required('Bitte eine korrekte Telefonnummer eingeben')
              .test('regex', 'Die Nummer ist nicht korrekt', (val) => {
                  let regExp = new RegExp('^[0-9._+-]*$');
                  // mind. 4 Zeichen
                  if(val.length > 4) {
                  document.getElementById('submitButton').disabled = false;
                  }
                  

                  return regExp.test(val);
                })
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values) => {
        // API call will be here
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
          console.log(res)
        }).catch((err) => {console.log(err)});
    };

    const handleReset = () => {
        formik.setFieldValue('Telefonnummer', '');
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
            '10:00 - 12:00',
            'Mo10:00-12:00',
            'Di 10:00 - 12:00',
            'Mi 10:00 - 12:00',
            'Do 10:00 - 12:00',
            'Fr 10:00 - 12:00'
        ),
        createData(
            '12:00 - 14:00',
            'Mo 12:00 - 14:00',
            'Di 12:00 - 14:00',
            'Mi 12:00 - 14:00',
            'Do 12:00 - 14:00',
            'Fr 12:00 - 14:00'
        ),
        createData(
            '14:00 - 16:00',
            'Mo 14:00 - 16:00',
            'Di 14:00 - 16:00',
            'Mi 14:00 - 16:00',
            'Do 14:00 - 16:00',
            'Fr 14:00 - 16:00'
        ),
        createData(
            '16:00 - 18:00',
            'Mo 16:00 - 18:00',
            'Di 16:00 - 18:00',
            'Mi 16:00 - 18:00',
            'Do 16:00 - 18:00',
            'Fr 16:00 - 18:00'
        ),
        createData(
            '18:00 - 20:00',
            'Mo 18:00 - 20:00',
            'Di 18:00 - 20:00',
            'Mi 18:00 - 20:00',
            'Do 18:00 - 20:00',
            'Fr 18:00 - 20:00'
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
                <Grid container spacing={1}>
                    <Typography variant="h1">Kontaktanfragenformular</Typography>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" border>
                                <TableHead>
                                    <TableRow align="center">
                                        <TableCell></TableCell>
                                        <TableCell align="right" id="Montag">
                                            Montag
                                        </TableCell>
                                        <TableCell align="right" id="Dienstag">
                                            Dienstag
                                        </TableCell>
                                        <TableCell align="right" id="Mittwoch">
                                            Mittwoch
                                        </TableCell>
                                        <TableCell align="right" id="Donnerstag">
                                            Donnerstag
                                        </TableCell>
                                        <TableCell align="right" id="Freitag">
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
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0
                                                    }
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.timeSlot}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    onClick={handleCellClick}
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
                                                    onClick={handleCellClick}
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
                                                    onClick={handleCellClick}
                                                    id={row.mittwoch}
                                                    className={
                                                        selectedSlots.includes(row.mittwoch) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.mittwoch}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    onClick={handleCellClick}
                                                    id={row.donnerstag}
                                                    className={
                                                        selectedSlots.includes(row.donnerstag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.donnerstag}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    onClick={handleCellClick}
                                                    id={row.freitag}
                                                    className={
                                                        selectedSlots.includes(row.freitag) &&
                                                        'table-cell-bg'
                                                    }
                                                >
                                                    {row.freitag}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid container marginTop={4} marginLeft={110} item xs={12} sm={12} md={12} lg={12}>
                        <Stack
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="overline" display="block">
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
                            <Buttons
                                type="button"
                                size="medium"
                                variant="outlined"
                                buttonText="Zurücksetzen"
                                startIcon={<DeleteIcon />}
                                styles={{ width: '50%' }}
                                handleClick={handleReset}
                            />
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
            </form>
            <Modal
                isOpen={showModal}
                handleClose={() => setShowModal(false)}
                handleContinuePress={() => setShowModal(false)}
                isShowButtons
                showContinueBtn
                modalTilte="Success"
                modalDescription="Timeslot has been saved successfully !"
            />
        </>
    );
};

export default Schedule;