import {
  compose,
  legacy_createStore as createStore,
  Middleware,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { RootState, rootReducer } from "./root-reducer";
import { thunk } from "redux-thunk";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer as any
);

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean) as Middleware[];

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
