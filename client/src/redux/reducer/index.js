import { GET_ALL_RECIPES, GET_RECIPES_BY_ID, GET_RECIPES_BY_NAME, ORDER_BY_NAME } from "../actions";

const initialState = {
    recipes: [],
    recipeDetail: {}
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: payload,
            }
            case GET_RECIPES_BY_NAME:
                //console.log(state)
                return{
                    ...state,
                    recipes: payload,
            }
            case GET_RECIPES_BY_ID:
                return{
                    ...state,
                    recipeDetail: payload,
                }
            case ORDER_BY_NAME:
                const orderName = payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
                return{
                    ...state,
                    recipes: orderName
                }
                default:
                    return state;
                }
}

export default rootReducer;