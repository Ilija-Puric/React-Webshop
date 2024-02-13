import { put } from 'redux-saga/effects';
import { Types as FavoriteTypes } from './index';

const { LIKE_PRODUCT_SUCCESS, LIKE_PRODUCT_FAILURE } = FavoriteTypes;

export function* likeProduct({ payload }: any) {
  try {
    yield put({
      type: LIKE_PRODUCT_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: LIKE_PRODUCT_FAILURE,
      errorMessage: error,
    });
  }
}

export default likeProduct;
