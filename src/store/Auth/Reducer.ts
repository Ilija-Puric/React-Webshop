import { createReducer } from 'reduxsauce';
import { Types as AuthTypes } from './index';
import { Error, UserSchema } from '../../types';
const { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } = AuthTypes;

const initialState: UserSchema = {
  currentLoggedUser: null,
  loading: false,
  errorMessage: null,
  userRegistered: false,
};

const loginUser = (state: any) => ({
  ...state,
  loading: true,
  errorMessage: null,
});

const loginUserSuccess = (state: any, { payload }: any) => ({
  ...state,
  currentLoggedUser: payload,
  loading: false,
  errorMessage: null,
});

const loginUserFailure = (state: any, { payload: { error } }: Error) => ({
  ...state,
  currentLoggedUser: null,
  errorMessage: error,
  loading: false,
  userRegistered: false,
});

const AuthReducer = createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [LOGIN_USER_SUCCESS]: loginUserSuccess,
  [LOGIN_USER_FAILURE]: loginUserFailure,
});

export default AuthReducer;
