import axios from 'axios';
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const CLEAN_RECIPE = "CLEAN_RECIPE";
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_SCORE = 'ORDER_SCORE';
export const ORDER_BY_DIET = 'ORDER_BY_DIET';
export const GET_RECIPES_BY_DIET = 'GET_RECIPES_BY_DIET';
export const POST = 'POST';

export function getAllRecipes(){
        return async function(dispatch){       
            return axios.get('http://localhost:3001/recipes')
            .then((response) => response.data)
            .then((json) => {dispatch({ type: GET_ALL_RECIPES, payload: json });
            })
            .catch((err) => {dispatch({ type: GET_ALL_RECIPES, payload: err });
            });
        }
    //}
}
export function getRecipesByName(name){
    
        //console.log(name)
        return async function (dispatch){
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            dispatch({type: GET_RECIPES_BY_NAME, payload: json.data})
            //console.log(json)
        }
   
}
export function getRecipeById(id){
    console.log(id);
   
        return async function(dispatch){
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({type: GET_RECIPES_BY_ID, payload: json.data})
        };
}
export function getByDiet(){
  //  console.log(id);
   
        return async function(dispatch){
            var json = await axios.get(`http://localhost:3001/diets`);
            return dispatch({type: GET_RECIPES_BY_DIET, payload: json.data})
        };
}
export function orderByDiet(payload){
    return{
        type: ORDER_BY_DIET,
        payload
    }
}
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
      }
    };
export function orderByScore(payload){
    return{
        type: ORDER_SCORE,
        payload
      }
    };
export function postRecipe(payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/create`, payload);
        // console.log(json + '<=========')
        // dispatch({ type: POST, payload: json });
        return json;
    };
}