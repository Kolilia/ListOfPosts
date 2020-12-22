import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./components/App";
import ErrorHandler from "./components/ErrorHandler";
import { allReducers, allSagas } from "./store";
import { theme } from "./theme";

const jss = create({
  plugins: [...jssPreset().plugins],
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

render(
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ErrorHandler>
          <App />
        </ErrorHandler>
      </Provider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);

sagaMiddleware.run(allSagas);
