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


function SpendingForm(props) {

  const [ spendingID, setSpendingId] = useState(null);

  

  return (
    <div>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Controller
          name="description"
          control={props.control}
          defaultValue=""
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
        >
          Track it!
        </Button>
      </form>
    </div>
  );
} 

export default SpendingForm;