import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import inputReset from '../../constants/index.ts';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { Creators as ProductCreators } from '../../store/Product';
import { useDispatch } from 'react-redux';

const { getAllProducts } = ProductCreators;

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b60ff',
      contrastText: '#fff0ec',
    },
  },
});
const Input = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;

  ${inputReset}
`;

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce<string>(search, 400);

  useEffect(() => {
    dispatch(getAllProducts({ q: search }));
  }, [debouncedValue]);

  return (
    <Input>
      <ThemeProvider theme={theme}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
        />
      </ThemeProvider>
    </Input>
  );
};

export default Search;
