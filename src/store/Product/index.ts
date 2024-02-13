import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getAllProducts: ['payload'],
  getAllProductsSuccess: ['payload'],
  getAllProductsFailure: ['error'],

  getProductByID: ['payload'],
  getProductByIDSuccess: ['payload'],
  getProductByIDFailure: ['error'],
});

export { Types };
export { Creators };
