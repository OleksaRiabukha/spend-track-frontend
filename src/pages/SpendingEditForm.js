import React from "react";
import { Controller } from "react-hook-form";

import {
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';


function SpendingEditForm(props) {


  const onSubmit = values => {
    let spendingId = props.spendingId
    axios.put(`https://spend-and-track.herokuapp.com/${spendingId}`, {
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
    } else {
      props.setIsError(true);
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