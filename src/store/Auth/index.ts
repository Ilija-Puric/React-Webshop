import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginUser: ['payload'],
  loginUserSuccess: ['payload'],
  loginUserFailure: ['error'],
});

export { Types };
export { Creators };
