import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './RootSaga';

import createRootReducer from '.';

export const history = createBrowserHistory();
export const rootReducer = createRootReducer;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'products', 'cart', 'favorites'],
};
export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistReducer(persistConfig, connectRouter(history)(rootReducer)), // root reducer with router state
    preloadedState,
    compose(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history)))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
