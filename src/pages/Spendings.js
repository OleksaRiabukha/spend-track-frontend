import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

import {
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';

function Spendings(props) {
  const { setAuthTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const [ token, setToken] = useState(
    localStorage.getItem('token')
  );

  const { handleSubmit, control } = useForm();

  const categories = [
    { value: 'Clothes', id: 1 },
    { value: 'Travelling', id: 2},
    { value: 'Taxi', id: 3 },
    { value: 'Cafe', id: 4 },
    { value: 'Shops', id: 5 },
    { value: 'Other', id: 6 },
  ];

  const onSubmit = values => {
        console.log(values);
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
          console.log(categories);
          console.log(result);
        } else {
          setIsError(true);
          console.log(isError);
        }
      }).catch(e => {
        setIsError(true);
        console.log(isError);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="description"
        control={control}
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
        control={control}
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
        control={control}
        defaultValue=""
        options={categories}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField 
            selectuseEffect
            label="Category"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={ error ? error.message: null }  
          >
            {categories.map((option) => (
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
  );
};

export default Spendings;