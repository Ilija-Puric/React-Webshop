import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const shippingSchema = yup.object().shape({
  address: yup.string().required('This field is required'),
  phoneNumber: yup
    .string()
    .required('This field is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
  additionalMessage: yup.string().max(255, 'to long'),
});

export default shippingSchema;
