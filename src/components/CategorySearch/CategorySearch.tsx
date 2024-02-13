import { TextField, Autocomplete } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import inputReset, { categories } from '../../constants';
import { Creators as ProductCreators } from '../../store/Product';
import { useDispatch } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b60ff',
      contrastText: '#fff0ec',
    },
  },
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  ${inputReset}

  button svg {
    fill: #0b60ff !important;
  }
  label + div fieldset {
    border-color: #ffffff24;
  }
`;

const { getAllProducts } = ProductCreators;

const CategorySearch = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Autocomplete
          options={categories}
          onChange={(_, value) => {
            dispatch(getAllProducts({ category: value }));
          }}
          renderInput={(params: any) => <TextField {...params} label="Category" />}
        />
      </ThemeProvider>
    </Wrapper>
  );
};

export default CategorySearch;
