"use strict";

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Context, Dispatcher, StoreGroup } from "almin";
import App from "./component/App.js";
import LiveStore from "./store/LiveStore.js";
import FetchUseCase from "./usecase/FetchUseCase.js";

const dispatcher = new Dispatcher();
const store = new StoreGroup({
  live: new LiveStore()
});

const appContext = new Context({
  dispatcher,
  store,
  options: { strict: true }
});

appContext
  .useCase(new FetchUseCase())
  .execute()
  .then(() => {
    ReactDOM.render(
      <App appContext={appContext} />,
      document.querySelector("#content")
    );
  });
