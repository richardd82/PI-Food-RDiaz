import axios from 'axios';
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
// export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
// export const GET_BY_DIET = 'GET_BY_DIET';
// export const ORDER_ASC = 'ORDER_ASC';
// export const ORDER_DESC = 'ORDER_DESC';
// export const ORDER_SCORE = 'ORDER_SCORE';

export function getAllRecipes(){

    return async function(dispatch){       
        return axios.get('http://localhost:3001/recipes')
        .then((response) => response.data)
        .then((json) => {dispatch({ type: GET_ALL_RECIPES, payload: json });
        })
        .catch((err) => {dispatch({ type: GET_ALL_RECIPES, payload: err });
        });
    }
}