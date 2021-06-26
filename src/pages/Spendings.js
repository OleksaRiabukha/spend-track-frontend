import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/auth";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

import {
  TextField,
  Button,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  Dialog,
  Container
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SpendingForm from "./SpendingForm";
import SpendingEditPopUp from "./SpendingPopUp";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Spendings(props) {
  const { setAuthTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const [ token, setToken] = useState(
    localStorage.getItem('token')
  );
  const [ spendingId, setSpendingId ] = useState(null);

  const [spendings, setSpendings] = useState([]);
  const [count, setCount ] = useState(0);
  const { handleSubmit, control } = useForm();

  const [open, setOpen ] = useState(false);

  const handleOpen = (e) => {
    setSpendingId(e.currentTarget.value);
    console.log(spendingId);
    setOpen(true)
  };
    
  const handleClose= () => {
    setOpen(false)
  };

  const categories = [
    { value: 'Clothes', id: 1 },
    { value: 'Travelling', id: 2},
    { value: 'Taxi', id: 3 },
    { value: 'Cafe', id: 4 },
    { value: 'Shops', id: 5 },
    { value: 'Other', id: 6 },
  ];

  const onSubmit = (values) => {
        axios.post("http://localhost:3001/api/spendings", {
        spending: {
        description: values.description,
        amount: values.amount,
        category_id: values.category_id,
      }},{
        headers: {
          'Authorization': token,
        }
      }
      ).then(result => {
        if (result.status === 200) {
          setCount(count + 1);
        } else {
          setIsError(true);
          console.log(isError);
        }
      }).catch(e => {
        setIsError(true);
        console.log(isError);
      });
  };
  const classes = useStyles();

  useEffect(() => {
    const fetchSpendings = async () => {
      const result = await axios.get("http://localhost:3001/api/spendings", 
      {
        headers: {
          'Authorization': token,
        }
      },)
      setSpendings(result.data.spendings);
    };
    fetchSpendings();
  }, [count]);

  

  const [sort, setSort] = useState('');

  const handleRadioChange = (event) => {
    setSort(event.target.value);
    console.log(event.target.value)
  }

  const handleSortTable = (e) => {
    let config ={ 
      headers: { 'Authorization': token },
      params: {
        sort_by: sort, 
      },
    }
    const fetchSortedSpendings = async () => {
      const result = await axios.get("http://localhost:3001/api/spendings", 
      config)
      setSpendings(result.data.spendings);
    };
    fetchSortedSpendings();
  }

  const handleDelete = (e) => {
    console.log(e.currentTarget.value)
    let spending_id = e.currentTarget.value
    axios.delete(`http://localhost:3001/api/spendings/${spending_id}`, 
    {
      headers: {
        'Authorization': token
      }
    },).then(result => {
      if (result.status === 204) {
        console.log(result);
        setCount(count +1);
      }
    }).catch(e => {
      setIsError(true);
      console.log(e)
    })
  };

  return (
    <div>
    <SpendingForm 
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      categories={categories}
    />
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup defaultValue="created_at desc" name="sort_by" onChange={handleRadioChange}>
          <FormControlLabel 
            value="amount asc"
            control={<Radio />}
            label='By amount, from smaller to bigger'
          />
          <FormControlLabel 
            value="amount desc"
            control={<Radio />}
            label='By amount, from bigger to smaller'
          />
          <FormControlLabel 
            value="created_at desc"
            control={<Radio />}
            label='By date, from last to first '
          />
          <FormControlLabel 
            value="created_at asc"
            control={<Radio />}
            label='By date, from first to last '
          />
        </RadioGroup>
        <Button type="submit" variant="outlined" color="primary" onClick={handleSortTable}>Sort it!</Button>
      </FormControl>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spendings.map((spending) => 
              <TableRow key={spending.id}>
                <TableCell component="th" scope="row">{spending.description}, {spending.id}</TableCell>
                <TableCell component="th" scope="row">{spending.amount}</TableCell>
                <TableCell component="th" scope="row">Category</TableCell>
                <TableCell component="th" scope="row">
                  <Button
                  variant="outlined"
                  color="primary"
                  value={spending.id}
                  onClick={handleOpen}
                  >
                    Edit
                  </Button>
                  <SpendingEditPopUp 
                    open={open} 
                    handleClose={handleClose} 
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    control={control}
                    categories={categories}
                    spendingId={spendingId}
                    token={token}
                    isError={isError}
                    setIsError={setIsError}
                    count={count}
                    setCount={setCount}
                  />
                  <Button 
                  variant="outlined" 
                  color="secondary" 
                  value={spending.id} 
                  onClick={(e) => handleDelete(e)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )}    
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Spendings;