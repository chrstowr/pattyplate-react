import * as ActionTypes from "./ActionTypes"
import { baseUrl } from '../shared/baseUrl';

export const fetchHistory = () => dispatch => {
    dispatch(historyLoading());

    return fetch(baseUrl + 'history')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
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
}

export const addHistory = history => ({
    type: ActionTypes.ADD_HISTORY,
    payload: history
})

export const historyFailed = errMess => ({
    type: ActionTypes.HISTORY_FAILED,
    payload: errMess
})

export const historyLoading = () => ({
    type: ActionTypes.HISTORY_LOADING
})