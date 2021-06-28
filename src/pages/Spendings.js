import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useForm } from "react-hook-form";

import {
  Button,
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
  Container,
  Typography,
  Grid
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SpendingForm from "./SpendingForm";
import SpendingEditPopUp from "./SpendingPopUp";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center"
  },

  enterSpending: {
    marginTop: "50px",
    marginBottom: "20px"
  },

  sortButton: {
    justifyContent: "center",
  },
  form: {
    marginTop: 500,
  },

  style: {
    justifyContent: "rigth"
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

  const [totalAmount, setTotalAmount] = useState(null);

  const handleOpen = (e) => {
    setSpendingId(e.currentTarget.value);
    setOpen(true)
  };
    
  const handleClose= () => {
    setOpen(false)
  };

  const categories = [
    { value: 'Clothes', id: 1 },
    { value: 'Travelling', id: 3},
    { value: 'Taxi', id: 2 },
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
        }
      }).catch(e => {
        setIsError(true);
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
      setTotalAmount(result.data.total_amount);
      setSpendings(result.data.spendings.data);
    };
    fetchSpendings();
  }, [count]);

  

  const [sort, setSort] = useState('');

  const handleRadioChange = (event) => {
    setSort(event.target.value);
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
      setSpendings(result.data.spendings.data);
    };
    fetchSortedSpendings();
  }

  const handleDelete = (e) => {
    let spending_id = e.currentTarget.value
    axios.delete(`http://localhost:3001/api/spendings/${spending_id}`, 
    {
      headers: {
        'Authorization': token
      }
    },).then(result => {
      if (result.status === 204) {
        setCount(count +1);
      }
    }).catch(e => {
      setIsError(true);
    })
  };

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Typography variant="h4" className={classes.enterSpending}>Enter new spending:</Typography>
        <SpendingForm 
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          categories={categories}
          className={classes.form}
        />
          <FormControl component="fieldset">
            <FormLabel component="legend" align="left">Sort by</FormLabel>
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
            <Button 
            type="submit" 
            variant="outlined" 
            color="primary" 
            onClick={handleSortTable} 
            className={classes.sortButton}
            style={{ width: "20%"}}
            >
              Sort it!
            </Button>
          </FormControl>
          <Typography variant="h5" className={classes.style}>Cool, you have spent a total of ${totalAmount}</Typography>
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
                    <TableCell component="th" scope="row">{spending.attributes.description}</TableCell>
                    <TableCell component="th" scope="row">{spending.attributes.amount}</TableCell>
                    <TableCell component="th" scope="row">{spending.attributes.category.name}</TableCell>
                    <TableCell component="th" scope="row" align="center">
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
      </Grid>
    </div>
  );
};

export default Spendings;