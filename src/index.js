import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../src/store/configureStore";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const initialState = {
  category: "all",
  detailsRequested: false,
  items: [],
  itemsExtended: [],
  itemsHasErrored: false,
  itemsIsLoading: false,
  itemsTotal: 0,
  input: "",
  newSearch: false,
  pagination: 30,
  sort: "relevance",
  userSearchRequest: [],
};

const store = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
