import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
});

export default userSchema;
