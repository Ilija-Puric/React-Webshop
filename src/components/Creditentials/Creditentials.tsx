import { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '../../stories/Button/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/shopping-bag.svg'
import inputReset from '../../constants/index';
import userSchema from '../../validations/UserValidation.ts';
import { Creators as AuthCreators } from '../../store/Auth/index';
import { Account } from '../../types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b60ff',
      contrastText: '#fff0ec',
    },
  },
});

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
    height: 100vh;
    padding: 0 40px;

    .credentials__logo {
        width: 80px;
        height: fit-content;
        margin: 0 auto;
    }

    ${inputReset}

    @media screen and (max-width:800px) {
    & {
        padding: 0 20px;
    }
}
`;

const { loginUser } = AuthCreators;

const Creditentials = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = ({ name, password }: Account) => {
    const user = { name, password };
    try {
      dispatch(
        loginUser({
          user,
          navigate,
          toast: {
            success: () => toast.success(`Logged in`),
            error: () => toast.error('Wrong credentials'),
          },
        })
      );
    } catch (e) {
      toast.error(`Couldn't log in`);
    }
  };

  return (
    <Wrapper className="credentials" onSubmit={handleSubmit(onSubmit)}>
      <img src={logo} alt="Vega IT logo" className="credentials__logo" />
      <ThemeProvider theme={theme}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              label="Name"
              variant="outlined"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              id="password"
              label="Password"
              variant="outlined"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button label="Login" primary type="submit" />
      </ThemeProvider>
      <ToastContainer />
    </Wrapper>
  );
};

export default memo(Creditentials);
