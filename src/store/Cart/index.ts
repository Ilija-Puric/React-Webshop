import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  createCart: ['payload'],
  createCartSuccess: ['payload'],
  createCartFailure: ['error'],

  setCartState: ['payload'],
  setCartStateSuccess: ['payload'],
  setCartStateFailure: ['error'],
});

export { Types };
export { Creators };
