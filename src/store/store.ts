import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    characters: reducer,
  },
  middleware: [sagaMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
