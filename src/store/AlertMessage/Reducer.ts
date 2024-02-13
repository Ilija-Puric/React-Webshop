import { createReducer } from 'reduxsauce';

import { Types as AlertMessageTypes } from './index';
import { Message } from '../../types';

const { TOGGLE_ALERT_MESSAGE, TOGGLE_ALERT_MESSAGE_SUCCESS, TOGGLE_ALERT_MESSAGE_FAILURE } = AlertMessageTypes;

const initialState = {
  messageType: '',
  message: '',
};

const toggleAlertMessage = (state: any) => ({
  ...state,
  messageType: state.messageType,
  message: state.message,
});

const toggleAlertMessageSuccess = (state: any, { payload }: Message) => ({
  ...state,
  messageType: payload.messageType,
  message: payload.message,
});

const toggleAlertMessageFailure = (state: any, { error }: Message) => ({
  ...state,
  messageType: 'error',
  message: error,
});

const AlertMessageReducer = createReducer(initialState, {
  [TOGGLE_ALERT_MESSAGE]: toggleAlertMessage,
  [TOGGLE_ALERT_MESSAGE_SUCCESS]: toggleAlertMessageSuccess,
  [TOGGLE_ALERT_MESSAGE_FAILURE]: toggleAlertMessageFailure,
});

export default AlertMessageReducer;
