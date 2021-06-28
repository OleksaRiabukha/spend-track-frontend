import * as yup from 'yup';

const SignUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Required')
    .max(50, 'Name should be less than 50 characters'),
  lastName: yup
    .string()
    .required('Required')
    .max(50, 'Name should be less than 50 characters'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Confirm your password')
    .max(50, 'Name should be less than 50 characters'),
});

export default SignUpValidationSchema;
