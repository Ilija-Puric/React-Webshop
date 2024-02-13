import axios from 'axios';
import { Cart } from '../../types';

const BASE_URL = 'https://dummyjson.com/carts/add';
export const createNewCart = (payload: Cart) => {
  return axios({
    method: 'post',
    url: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });
};
