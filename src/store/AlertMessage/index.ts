import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  toggleAlertMessage: ['payload'],
  toggleAlertMessageSuccess: ['payload'],
  toggleAlertMessageFailure: ['error'],
});

export { Types };
export { Creators };
