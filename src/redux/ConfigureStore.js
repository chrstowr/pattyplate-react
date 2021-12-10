import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { History } from './history';

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            history: History,
        }),
        applyMiddleware(thunk, logger)

    );
    return store;
};