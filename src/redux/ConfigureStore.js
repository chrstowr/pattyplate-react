import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { History } from "./history";
import { Menu } from "./menu";
import { Ingredient } from "./ingredient";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      history: History,
      menu: Menu,
      ingredient: Ingredient
    }),
    applyMiddleware(thunk)
  );
  return store;
};
