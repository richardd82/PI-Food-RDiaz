import { GET_ALL_RECIPES, GET_RECIPES_BY_ID, GET_RECIPES_BY_NAME } from "../actions";

const initialState = {
    recipe: [],
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
        case GET_RECIPES_BY_NAME:
            return{
                ...state,
                recipe: payload,
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