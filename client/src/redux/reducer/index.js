import { GET_ALL_RECIPES, GET_RECIPES_BY_ID, GET_RECIPES_BY_NAME, ORDER_BY_NAME, ORDER_SCORE, GET_RECIPES_BY_DIET, ORDER_BY_DIET } from "../actions";

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
                const allDiets = state.diets;
                let diets = allDiets.map(function (p){
                                    if (p.name) return p
                            });
                    diets = diets.filter((p) => p !== undefined);
                    const currentDiet = payload === "selected" ? allDiets
                    : diets.filter((p) => p.name.includes(payload))
                return{
                    ...state,
                    diets: currentDiet,
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
                default:
                    return state;
                }
}

export default rootReducer;