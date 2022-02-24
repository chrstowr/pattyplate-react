import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchHistory = () => dispatch => {
  dispatch(historyLoading());

  return fetch(baseUrl + "history")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(history => dispatch(addHistory(history)))
    .catch(error => dispatch(historyFailed(error.message)));
};

export const addHistory = history => ({
  type: ActionTypes.ADD_HISTORY,
  payload: history
});

export const historyFailed = errMess => ({
  type: ActionTypes.HISTORY_FAILED,
  payload: errMess
});

export const historyLoading = () => ({
  type: ActionTypes.HISTORY_LOADING
});

export const fetchMenu = () => dispatch => {
  dispatch(menuLoading());

  return fetch(baseUrl + "menu")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(menu => dispatch(addMenu(menu)))
    .catch(error => dispatch(menuFailed(error.message)));
};

export const addMenu = menu => ({
  type: ActionTypes.ADD_MENU,
  payload: menu
});

export const menuFailed = errMess => ({
  type: ActionTypes.MENU_FAILED,
  payload: errMess
});

export const menuLoading = () => ({
  type: ActionTypes.MENU_LOADING
});

export const fetchIngredient = () => dispatch => {
  dispatch(ingredientLoading());

  return fetch(baseUrl + "ingredient")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(ingredient => dispatch(addIngredient(ingredient)))
    .catch(error => dispatch(ingredientFailed(error.message)));
};

export const addIngredient = ingredient => ({
  type: ActionTypes.ADD_INGREDIENT,
  payload: ingredient
});

export const ingredientFailed = errMess => ({
  type: ActionTypes.INGREDIENT_FAILED,
  payload: errMess
});

export const ingredientLoading = () => ({
  type: ActionTypes.INGREDIENT_LOADING
});
