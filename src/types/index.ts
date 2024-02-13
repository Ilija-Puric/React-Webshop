export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: number;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
  total?: number;
}
export interface ProductWrapper {
  product: Product;
}
export interface ControlsProps {
  id: string | undefined;
  product: Product;
}

export interface CartProduct {
  id: number;
  quantity: number;
}

export type Action = 'empty' | 'add' | 'subtract' | 'replace' | 'like' | 'unlike';
export interface LocalProduct extends CartProduct {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  favorite: boolean;
  total?: number;
  handleDelete?: () => void;
}
export interface ProductSchema {
  allProducts: Product[];
  product: Product | null;
  totalElements: number;
  totalPages: number;
  loading: boolean;
  errorMessage: string | null;
  currentPage: number;
}

export interface ProductsPayload {
  payload: {
    limit: number;
    skip: number;
    total: number;
    select: string;
    products: Product[];
  };
}

export type User = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  image?: string;
  token?: string;
};

export type Account = { name: string; password: string };

export interface UserSchema {
  currentLoggedUser: null | User;
  loading: boolean;
  errorMessage: null | string;
  userRegistered: boolean;
}

export interface WrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export interface Message {
  payload: {
    messageType: string;
    message: string;
  };
  error: {
    messageType: string;
    message: string;
  };
}

export type Gender = 'male' | 'female';
export type Error = {
  payload: {
    error: string;
  };
};

export interface ProductParams {
  limit?: number;
  skip?: number;
  total?: number;
  select?: string;
  q?: string;
  category?: string;
}

export interface PayloadProductParams {
  payload: ProductParams;
}

export interface Cart {
  userId: number;
  products: Product[];
  id?: number;
  total?: number;
  totalProducts?: number;
  totalQuantity?: number;
  discountedTotal?: number;
}

export interface FavoriteSchema {
  allFavorites: Product[];
  favorite: number | null;
  loading: boolean;
  errorMessage: string | null;
}
export interface CartSchema {
  id: number | null;
  allProducts: Product[];
  localProducts: LocalProduct[];
  totalElements: number;
  totalProducts: number;
  totalQuantity: number;
  total: number;
  address: string;
  phoneNumber: string;
  additionalMessage: string;
  loading: boolean;
  errorMessage: string | null;
}

export interface ProductOrder {
  payload: LocalProduct;
  action: Action;
}

export interface ProductPayload {
  payload: {
    data: LocalProduct;
    action: Action;
  };
}

export interface DefaultPayload {
  type: string;
  payload: Cart;
}

export type Id = {
  payload: {
    id: string;
  };
};
