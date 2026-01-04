// src/ReactReudx/Store.js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension"; // 👈 Note the new import path
import { thunk } from "redux-thunk";
import reducer from "./Reducer";

const middleware = [thunk];

const Store = createStore(
  reducer,
  // You can still use composeWithDevTools but from the new package
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;