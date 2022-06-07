import * as Yup from 'yup';

// ! Validation for Profile form form
export const profileSchema = Yup.object({
  username: Yup.string().required('*Field is mendatory'),
  email: Yup.string()
    .email('*Please enter a valid E-mail id i.e. abc@gmail.com')
    .required('*Field is mendatory'),
  password: Yup.string()
    .required('*Field is mendatory')
    .min(8, 'Password should be greater than 7 letters.'),
  mobile: Yup.string().required('*Field is mendatory'),
  countryCode: Yup.string().required('*Field is mendatory'),
  marital: Yup.string().required('*Field is mendatory'),
  date: Yup.string().required('*Field is mendatory'),
  month: Yup.string().required('*Field is mendatory'),
  year: Yup.string().required('*Field is mendatory'),
  birthTime: Yup.string().required('*Field is mendatory'),
});
