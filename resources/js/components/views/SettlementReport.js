import React, { useContext, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Container, FormControl, Grid, IconButton, Input, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { useDateFormat } from '../../hooks/date.format.hook';
import SelectTable from './SelectTable';
import axios from 'axios';
import { KeyboardArrowDown, KeyboardArrowUp, Print as PrintIcon } from '@material-ui/icons';
import { useReactToPrint } from 'react-to-print';
import ExtendableButton from './ExtendableButton';
import { InputGroup, Form } from 'bootstrap-4-react';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '90%',
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  textField: {
    "& .MuiFormLabel-root": {
      fontSize: theme.font.size,
    },
    "& .MuiInputBase-root": {
      fontSize: theme.font.size,
    }
  },
  dateCell: {
    paddingLeft: theme.spacing(5),
  },
  groupRow: {
    backgroundColor: '#fafafa',
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
}));

const ClientRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { localeDate } = useDateFormat();

  return (
    <>
      <TableRow>
        <TableCell className={classes.groupRow} colSpan="4">
          <IconButton
            size="small"
            className={classes.noFocus}
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {row.Клиент.Наименование}
        </TableCell>
      </TableRow>
      {
        open &&
        row.children.map((row, rowIndex) =>
          <TableRow key={rowIndex}>
            <TableCell className={classes.dateCell}>
              {localeDate(row.Дата)}
            </TableCell>
            <TableCell>
              {row.СуммаПриход}
            </TableCell>
            <TableCell>
              {row.СуммаРасход}
            </TableCell>
            <TableCell>
              {row.СуммаОстаток}
            </TableCell>
          </TableRow>
        )
      }
    </>
  )
}

const monthDays = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
  return { firstDay, lastDay }
}

const SettlementReport = () => {
  const [client, setClient] = useState(null);
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState(monthDays().firstDay);
  const [dateTo, setDateTo] = useState(monthDays().lastDay);
  const [file,setFile] = useState(null);
  const classes = useStyles();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "printWindow"
  });

  const handleFetch = async (e) => {
    const response = await axios.get(`api/client_settlement_register/fetch/${client ? client.id : 0}/${dateFrom}/${dateTo}`);
    if (response.status === 200) {
      const resData = await response.data;
      if (resData) {
        console.log(resData);
        setData(resData.sort((prev, next) => {
          if (prev.Клиент.Наименование > next.Клиент.Наименование) {
            return 1;
          }
          if (prev.Клиент.Наименование < next.Клиент.Наименование) {
            return -1;
          }
          return 0;
        }));
      }
    }
  }

  const fileOnChange=(e)=> {
    console.log(e.target.files[0]);
  }

  return (
    <>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetch}
        >
          <Typography variant="body2">Сформировать </Typography>
        </Button>
        <ExtendableButton
          variant="contained"
          startIcon={<PrintIcon color="primary" />}
          onClick={handlePrint}
        >
          <Typography variant="body2">Печать</Typography>
        </ExtendableButton>
      </div>
      <Container ref={componentRef}>
        <h3>Отчет по взаиморасчетам с клиентами</h3>
        <Grid container spacing={1}>
          <Grid item sm={12} lg={6} >
            <SelectTable
              node={{
                label: 'Клиент',
                key: 'Клиент',
                api: '/api/clients',
              }}
              nodeIndex={0}
              onSubmit={setClient}
              value={client} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="период с"
              margin="dense"
              name="dateFrom"
              type="date"
              size="small"
              value={dateFrom}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDateFrom(e.target.value)}
              className={classes.textField}
            />
          &nbsp; &nbsp;
          <TextField
              label="по"
              margin="dense"
              name="dateTo"
              type="date"
              size="small"
              value={dateTo}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDateTo(e.target.value)}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <TableContainer className={classes.container}>
          <Table
            size="medium"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Клиент/Дата
              </TableCell>
                <TableCell>
                  Начисление
              </TableCell>
                <TableCell>
                  Оплата
              </TableCell>
                <TableCell>
                  Долг
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map((row, i) => <ClientRow key={i} row={row} />)
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}



export default SettlementReport;