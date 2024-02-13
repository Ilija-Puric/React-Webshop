import { call, put } from 'redux-saga/effects';
import { Types as ProductTypes } from './index';
import { fetchAllProducts, fetchProductById, fetchProductsByCategory } from './Api';
import { Id } from '../../types';
const { GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE } =
  ProductTypes;

export function* getAllProducts({ payload = {} }: any): Generator<any> {
  try {
    let response;
    if (payload?.category) {
      response = yield call(fetchProductsByCategory, payload?.category);
    } else {
      response = yield call(fetchAllProducts, payload);
    }
    const { data } = response as any;
    yield put({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    yield put({
      type: GET_ALL_PRODUCTS_FAILURE,
    });
  }
}

export function* getProductByID({ payload: { id } }: Id): Generator<any> {
  try {
    const { data }: any = yield call(fetchProductById, id);
    yield put({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    yield put({
      type: GET_PRODUCT_BY_ID_FAILURE,
      errorMessage: error,
    });
  }
}

export default getAllProducts;
