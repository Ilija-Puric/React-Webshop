import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  likeProduct: ['payload'],
  likeProductSuccess: ['payload'],
  likeProductFailure: ['error'],

  unlikeProduct: ['payload'],
  unlikeProductSuccess: ['payload'],
  unlikeProductFailure: ['error'],
});

export { Types };
export { Creators };
