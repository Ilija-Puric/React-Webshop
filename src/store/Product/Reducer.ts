import { createReducer } from 'reduxsauce';
import { Types as ProjectsTypes } from './index';
import { ProductSchema, ProductsPayload } from '../../types';

const {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,

  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
} = ProjectsTypes;

const initialState: ProductSchema = {
  allProducts: [],
  product: null,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  errorMessage: null,
  currentPage: 0,
};

const getAllProducts = (state: any) => ({
  ...state,
  loading: true,
  errorMessage: null,
});

const getAllProductsSuccess = (state: any, { payload: { products, total } }: ProductsPayload) => ({
  ...state,
  allProducts: products,
  totalElements: total,
  currentPage: 0,
  totalPages: 10,
  loading: false,
  errorMessage: null,
});

const getAllProductsFailure = (state: any, { error }: any) => ({
  ...state,
  loading: false,
  errorMessage: error,
});

const getProductByID = (state: any) => ({
  ...state,
  loading: true,
  errorMessage: null,
});

const getProductByIDSuccess = (state: any, { payload }: any) => ({
  ...state,
  product: payload,
  loading: false,
  errorMessage: null,
});

const getProductByIDFailure = (state: any, { error }: any) => ({
  ...state,
  loading: false,
  errorMessage: error,
});

const ProductReducer = createReducer(initialState, {
  [GET_ALL_PRODUCTS]: getAllProducts,
  [GET_ALL_PRODUCTS_SUCCESS]: getAllProductsSuccess,
  [GET_ALL_PRODUCTS_FAILURE]: getAllProductsFailure,

  [GET_PRODUCT_BY_ID]: getProductByID,
  [GET_PRODUCT_BY_ID_SUCCESS]: getProductByIDSuccess,
  [GET_PRODUCT_BY_ID_FAILURE]: getProductByIDFailure,
});

export default ProductReducer;
