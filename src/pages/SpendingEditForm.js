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
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


function SpendingEditForm(props) {


  const onSubmit = values => {
    console.log(values);
    let spendingId = props.spendingId
    console.log(spendingId);
    axios.put(`http://localhost:3001/api/spendings/${spendingId}`, {
    spending: {
    description: values.description,
    amount: values.amount,
    category_id: values.category_id,
  }},{
    headers: {
      'Authorization': props.token,
    }
  }
  ).then(result => {
    if (result.status === 200) {
      props.setCount(props.count + 1);
      console.log(result);
    } else {
      props.setIsError(true);
      console.log(props.isError);
    }
  }).catch(e => {
    props.setIsError(true);
  });
};

  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <Controller
          name="description"
          control={props.control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField 
              label="Description"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message: null}
            />
          )}
          rules={{ required: "Please, enter a description"}}
        />
        <Controller 
          name="amount"
          control={props.control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField 
              label="Amount"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message: null}
            />
          )}
          rules={{ required: "Please, enter an amount" }}
        />
        <Controller 
          name="category_id"
          control={props.control}
          defaultValue=""
          options={props.categories}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField 
              select
              label="Category"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={ error ? error.message: null }  
            >
              {props.categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Button
          variant="outlined"
          type="submit"
          onClick={props.handleClose}
        >
          Edit it!
        </Button>
      </form>
    </div>
  );
} 

export default SpendingEditForm;