import { put, delay } from 'redux-saga/effects';
import { Types as AlertMessageTypes } from './index';
import { Message } from '../../types/index';

const { TOGGLE_ALERT_MESSAGE_SUCCESS, TOGGLE_ALERT_MESSAGE_FAILURE } = AlertMessageTypes;
export function* toggleAlertMessage({ payload }: Message) {
  try {
    yield put({ type: TOGGLE_ALERT_MESSAGE_SUCCESS, payload });
  } catch (error) {
    yield put({
      type: TOGGLE_ALERT_MESSAGE_FAILURE,
      error: 'There is an error!',
    });
  }
  yield delay(3000);
  yield put({
    type: TOGGLE_ALERT_MESSAGE_SUCCESS,
    payload: { messageType: '', message: '' },
  });
}
