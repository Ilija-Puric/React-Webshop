import axios from 'axios';
import { ProductParams } from '../../types';

const BASE_URL = 'https://dummyjson.com/products';
const BASE_URL_CATEGORIES = 'https://dummyjson.com/products/category/';

function createQueryString(obj: any, url: string) {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  });
  return `${url}/${obj?.q ? 'search?' : '?'}${keyValuePairs.join('&')}`;
}

export const fetchAllProducts = (params: ProductParams) => {
  return axios.get(createQueryString(params, BASE_URL));
};

export const fetchProductsByCategory = (category: string) => {
  if (category) {
    return axios.get(`${BASE_URL_CATEGORIES}${category}`);
  }
  return {};
};

export const fetchProductById = (id: string) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export default fetchAllProducts;
