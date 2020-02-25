import React from "react";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./Redux/Reducers";
import Kanban from "./kanban";
import { createStore, applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
export default () => (
  <Provider store={store}>
    <Kanban />
  </Provider>
);
