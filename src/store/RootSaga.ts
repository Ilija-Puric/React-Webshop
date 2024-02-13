import { all, takeLatest } from 'redux-saga/effects';
import { Types as AlertMessageTypes } from './AlertMessage';
import { Types as ProductTypes } from './Product';
import { Types as AuthTypes } from './Auth';
import { Types as CartTypes } from './Cart';
import { Types as FavoriteTypes } from './Favorites';

import { toggleAlertMessage } from './AlertMessage/Saga';
import { loginUser } from './Auth/Saga';
import { getAllProducts, getProductByID } from './Product/Saga';
import { createCart, setCartState } from './Cart/Saga';
import likeProduct from './Favorites/Saga';

const { LOGIN_USER } = AuthTypes;
const { TOGGLE_ALERT_MESSAGE } = AlertMessageTypes;
const { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } = ProductTypes;
const { CREATE_CART, SET_CART_STATE } = CartTypes;
const { LIKE_PRODUCT } = FavoriteTypes;

export default function* root() {
  yield all([
    takeLatest(TOGGLE_ALERT_MESSAGE as any, toggleAlertMessage),
    takeLatest(LOGIN_USER, loginUser),
    takeLatest(GET_ALL_PRODUCTS as any, getAllProducts),
    takeLatest(GET_PRODUCT_BY_ID as any, getProductByID),
    takeLatest(CREATE_CART as any, createCart),
    takeLatest(SET_CART_STATE as any, setCartState),
    takeLatest(LIKE_PRODUCT as any, likeProduct),
  ]);
}
