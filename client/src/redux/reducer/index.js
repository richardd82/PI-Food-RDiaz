import { GET_ALL_RECIPES, GET_RECIPES_BY_ID } from "../actions";

const initialState = {
    recipes: [],
    recipeDetail: {}
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: payload
            }
        case GET_RECIPES_BY_ID:
            return{
                ...state,
                recipeDetail: payload,
            }
            default:
                return state
    }
}

export default rootReducer;