import { GET_ALL_RECIPES, GET_RECIPES_BY_ID, GET_RECIPES_BY_NAME, ORDER_BY_NAME, ORDER_SCORE, GET_RECIPES_BY_DIET, ORDER_BY_DIET, POST } from "../actions";

const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: []
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
            case GET_RECIPES_BY_DIET:
                return{
                    ...state,
                    diets: payload,
                }
            case ORDER_BY_DIET:
                const allRecipes = state.recipes;
                const selectedDiet = allRecipes.filter(e => {
                    let diet = "";
                    for(let i=0; i < e.diets.length; i++){
                        if(e.diets[i] === payload.toLowerCase()){
                            diet = e.diets[i];
                        }
                    }
                    return diet;
                })
                console.log(selectedDiet)
                return{
                    ...state,
                    recipes: selectedDiet,
                }
            case ORDER_BY_NAME:
                const orderName = payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                });
                return{
                    ...state,
                    recipes: orderName
                }
                case ORDER_SCORE:
                console.log(state.recipes)
                const orderScore = payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return 1;
                    }
                    return 0;
                });
                return{
                    ...state,
                    recipes: orderScore
                }
                case POST:
                    return{
                        ...state,
                    }
                default:
                    return state;
                }
}

export default rootReducer;