import { TextField } from '@mui/material';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import inputReset, { uuidv4 } from '../../constants/index';
import { Button } from '../../stories/Button/Button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import shippingSchema from '../../validations/ShippingValidation';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct, CartSchema } from '../../types';
import { Creators as CartCreators } from '../../store/Cart';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b60ff',
      contrastText: '#fff0ec',
    },
  },
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  max-width: 800px;
  ${inputReset}
`;

const { createCart } = CartCreators;

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shippingSchema),
  });

  const { localProducts }: CartSchema = useSelector(({ cart }) => cart);

  const onSubmit = (data: any) => {
    const cartProducts: CartProduct[] = localProducts.map(({ id, quantity }) => {
      return { id, quantity };
    });
    dispatch(
      createCart({
        products: {
          userId: 1,
          products: cartProducts,
        },
        contact: data,
      })
    );
    navigate(`/checkout/${uuidv4()}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={theme}>
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <TextField
              {...field}
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              error={errors.address?.message}
              helperText={errors.address?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <TextField
              {...field}
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={errors.phoneNumber?.message}
              helperText={errors.phoneNumber?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="additionalMessage"
          render={({ field }) => (
            <TextField
              {...field}
              id="additionalMessage"
              label="Additional message *"
              variant="outlined"
              fullWidth
              error={errors.additionalMessage?.message}
              helperText={errors.additionalMessage?.message}
            />
          )}
        />
        <Button primary label="Buy" type="submit" />
      </ThemeProvider>
    </Form>
  );
};

export default CheckoutForm;
