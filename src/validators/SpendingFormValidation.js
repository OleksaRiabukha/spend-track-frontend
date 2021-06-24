import * as yup from 'yup';

const SpendingFormValidation = yup.object().shape({
  description: yup
    .string()
    .required('Required')
    .max(300, 'Description should be less than 300 characters'),
  amount: yup
    .number()
    .required('Required')
});

export default SpendingFormValidation;
