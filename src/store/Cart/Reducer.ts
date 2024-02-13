import { createReducer } from 'reduxsauce';
import { Types as ProjectsTypes } from './index';
import { CartSchema, DefaultPayload, ProductOrder } from '../../types';

const {
  CREATE_CART,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILURE,

  SET_CART_STATE,
  SET_CART_STATE_SUCCESS,
  SET_CART_STATE_FAILURE,
} = ProjectsTypes;

const initialState: CartSchema = {
  id: null,
  allProducts: [],
  localProducts: [],
  totalElements: 0,
  totalProducts: 0,
  totalQuantity: 0,
  total: 0,
  loading: false,
  errorMessage: null,
  address: '',
  phoneNumber: '',
  additionalMessage: '',
};

const createCart = (state: any, { payload }: any) => {
  return {
    ...state,
    ...payload,
    loading: true,
    errorMessage: null,
  };
};

const createCartSuccess = (state: any, { payload }: DefaultPayload) => {
  return {
    ...state,
    ...payload,
    localProducts: [],
    allProducts: payload.products,
    loading: false,
    errorMessage: null,
  };
};

const createCartFailure = (state: any, { error }: any) => ({
  ...state,
  loading: false,
  errorMessage: error,
});

const setCartState = (state: any) => ({
  ...state,
  loading: true,
  errorMessage: null,
});

const setCartStateSuccess = (state: CartSchema, { payload, action }: ProductOrder) => {
  const { id, quantity } = payload;
  const existingProductIndex = state.localProducts?.findIndex(({ id: localId }) => localId === id);

  if (existingProductIndex !== -1) {
    if (action === 'add') {
      state.localProducts[existingProductIndex].quantity += 1;
    } else if (action === 'subtract') {
      if (state.localProducts[existingProductIndex].quantity === 1) {
        state.localProducts.splice(existingProductIndex, 1);
      } else {
        state.localProducts[existingProductIndex].quantity -= 1;
      }
    } else if (action === 'empty') {
      state.localProducts.splice(existingProductIndex, 1);
    } else if (action === 'replace') {
      state.localProducts[existingProductIndex].quantity = quantity;
    }
  } else {
    state.localProducts = [...state.localProducts, payload];
  }
  return {
    ...state,
    loading: false,
    errorMessage: null,
  };
};

const setCartStateFailure = (state: any, { error }: any) => ({
  ...state,
  loading: false,
  errorMessage: error,
});

const CartReducer = createReducer(initialState, {
  [CREATE_CART]: createCart,
  [CREATE_CART_SUCCESS]: createCartSuccess,
  [CREATE_CART_FAILURE]: createCartFailure,

  [SET_CART_STATE]: setCartState,
  [SET_CART_STATE_SUCCESS]: setCartStateSuccess,
  [SET_CART_STATE_FAILURE]: setCartStateFailure,
});

export default CartReducer;
