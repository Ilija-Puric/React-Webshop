import axios from 'axios';
import { Account } from '../../types';

export const login = ({ name, password }: Account) => {
  return axios({
    method: 'post',
    url: `https://dummyjson.com/auth/login`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      username: name,
      password,
    },
  });
};
