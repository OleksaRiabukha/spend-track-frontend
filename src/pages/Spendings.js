import React, { useState } from "react";
import { useAuth } from "../context/auth";

import {
  TextField,
  Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import axios from 'axios';
import SpendingFormValidation from '../validators/SpendingFormValidation'

function Spendings(props) {
  const { setAuthTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const [ token, setToken] = useState(
    localStorage.getItem('token')
  );
  
  // function logOut() {
  //   setAuthTokens();
  // }
  // return (
  //   <div>
  //     <div>Spendings</div>
  //     <Button onClick={logOut}>Log out</Button>
  //   </div>
  // );

  return (
    <Formik
      initialValues={{
        description: '',
        amount: null,
      }}
      validationSchema={SpendingFormValidation}
      onSubmit={(values) => {
        axios.post("http://localhost:3001/api/spendings", {
        spending: {
        description: values.description,
        amount: values.amount
      }},{
        headers: {
          'Authorization': token,
        }
      }
      ).then(result => {
        if (result.status === 200) {
          console.log(result);
        } else {
          setIsError(true);
        }
      }).catch(e => {
        setIsError(true);
      });
    }
  }
    >
      {({
        errors, handleBlur, handleChange, touched,
      }) => (

        <Form>
          <TextField
            id="description"
            label="Enter description: "
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description ? errors.description : ''}
            margin="normal"
            variant="outlined"
            multiline
            rowsMax={4}
          />
          <TextField
            id="amount"
            type="amount"
            label="Enter amount: "
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.amount && Boolean(errors.amount)}
            helperText={touched.amount ? errors.amount : ''}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Track spending!
          </Button>
        </Form>
      )}
    </Formik>
  )}

export default Spendings;