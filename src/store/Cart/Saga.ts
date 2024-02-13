import { call, put } from 'redux-saga/effects';
import { Types as CartTypes } from './index';
import { createNewCart } from './Api';
import { ProductPayload } from '../../types';

const { CREATE_CART_SUCCESS, CREATE_CART_FAILURE, SET_CART_STATE_SUCCESS, SET_CART_STATE_FAILURE } = CartTypes;


export function* createCart({ payload: { products, contact } }: any) {
  try {
    const { data } = yield call(createNewCart, products);
    yield put({
      type: CREATE_CART_SUCCESS,
      payload: { ...data, ...contact },
    });

  } catch (error: any) {
    yield put({
      type: CREATE_CART_FAILURE,
      errorMessage: error,
    });
  }
}

export function* setCartState({ payload: { data, action } }: ProductPayload) {
  try {
    yield put({
      type: SET_CART_STATE_SUCCESS,
      payload: data,
      action,
    });
  } catch (error: any) {
    yield put({
      type: SET_CART_STATE_FAILURE,
      errorMessage: error,
    });
  }
}

export default createCart;
