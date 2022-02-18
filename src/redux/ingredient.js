import * as ActionTypes from './ActionTypes'

export const Ingredient = (state = { isLoading: true, errMess: null, ingredient: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_INGREDIENT:
            return {...state, isLoading: false, errMess: null, ingredient: action.payload};
        
        case ActionTypes.INGREDIENT_LOADING:
            return {...state, isLoading: true, errMess: null, ingredient:[]};

        case ActionTypes.INGREDIENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, ingredient:[]};

        default:
            return state;

    }
}