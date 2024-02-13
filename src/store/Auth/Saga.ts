import { put, call } from 'redux-saga/effects';
import { Types as AuthTypes } from './index';
import { login } from './Api';

const { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } = AuthTypes;

export function* loginUser({ payload }: any) {
  const { user, navigate, toast } = payload;
  try {
    const { data } = yield call(login, user);
    const { token } = data;
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: {
        ...data,
        token,
      },
    });
    yield localStorage.setItem('access_token', token);
    yield navigate('/');
  } catch (error: any) {
    toast.error();
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
