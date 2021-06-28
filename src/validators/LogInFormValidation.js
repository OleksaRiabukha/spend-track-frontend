import * as yup from 'yup';

const LogInFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
    .max(50, 'Name should be less than 50 characters'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .max(50, 'Password should be less than 50 characters')
    .required('Enter your password'),
});

export default LogInFormValidationSchema;
