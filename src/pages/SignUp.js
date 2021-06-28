import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import axios from 'axios';
import SignUpValidationSchema from '../validators/SignUpFormValidation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center"
  },
});

function Signup() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const classes = useStyles();
  
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  

  return (
    <div>
      <Grid className={classes.container} spacing={12} justifyContent="center"> 
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpValidationSchema}
          onSubmit={(values) => {
            console.log(values);
            axios.post("https://spend-and-track.herokuapp.com/api/signup", {
            user: {
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
            email: values.email
          }
          }).then(result => {
            if (result.status === 200) {
              setAuthTokens(result.data);
              console.log(result);
              console.log(result.data);
              setLoggedIn(true);
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
                id="firstName"
                label="Enter your first name: "
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName ? errors.firstName : ''}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="lastName"
                label="Enter your last name: "
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName ? errors.lastName : ''}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="email"
                label="Enter your email: "
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ''}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="password"
                type="password"
                label="Enter your password: "
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password ? errors.password : ''}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="confirmPassword"
                label="Confirm password: "
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
  </div>
)}

export default Signup;

