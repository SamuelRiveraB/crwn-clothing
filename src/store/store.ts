import {
  //   compose,
  //   legacy_createStore as createStore,
  Middleware,
  //   applyMiddleware,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { RootState, rootReducer } from "./root-reducer";
// import createSagaMiddleware from "redux-saga";
// import { rootSaga } from "./root-saga";

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"],
// };

// const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer<RootState>(
//   persistConfig,
//   rootReducer as any
// );

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  //   sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(middlewares),
});

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
