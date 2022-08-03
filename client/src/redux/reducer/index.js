import { GET_ALL_RECIPES, GET_RECIPES_BY_ID } from "../actions";

const initialState = {
    recipes: [],
    recipeDetail: {}
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_RECIPES_BY_ID:
            return{
                ...state,
                detail: action.payload,
            }
            default:
                return state
    }
}

export default rootReducer;