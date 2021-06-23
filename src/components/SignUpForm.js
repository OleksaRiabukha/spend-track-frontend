
import React from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import axios from 'axios';
import SignUpValidationSchema from '../validators/SignUpFormValidation';

const userFormEndpoint = 'http://localhost:3001/api/users';

const SignUp = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={SignUpValidationSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      axios.post(userFormEndpoint,
        {
          user: {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password_digest: values.password,
          },
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }).then((resp) => resp)
        .catch((error) => { alert(error); });
    }}
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
);

export default SignUp;
