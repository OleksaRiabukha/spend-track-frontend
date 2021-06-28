import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';

import { authTokens, useAuth } from '../context/auth';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import axios from 'axios';
import LogInFormValidationSchema from '../validators/LogInFormValidation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center"
  },
});

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const referer = props.location.state.referer || "/"
  const classes = useStyles();


  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div>
    < Grid className={classes.container} spacing={12} justifyContent="center"> 
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LogInFormValidationSchema}
        onSubmit={(values) => {
          axios.post("https://spend-and-track.herokuapp.com/api/login", {
          user: {
          password: values.password,
          email: values.email
        }
        }).then(result => {
          if (result.status === 200) {
            setAuthTokens(result.data);
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
            <Link to="/signup">Don't have an account?</Link>
          </Form>
        )}
      </Formik>
    </Grid>
  </div>
)}   

export default Login;