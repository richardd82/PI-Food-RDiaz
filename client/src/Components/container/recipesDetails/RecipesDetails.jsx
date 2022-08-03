import React from "react";
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById, cleanRecipe } from '../../../redux/actions';
import './recipesDetails.css'



export default function RecipesDetails(){
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.detail)
  let {id} = useParams();
  console.log(recipe + ' ************** ' + id)
  useEffect(() => {
    dispatch(getRecipeById(id))
    return () => {
      dispatch(cleanRecipe());
    }
  },[id, dispatch])



  return (
    <div key={id} className='detailsContainer'>
    {recipe.id}
      <h2 className='cardTitle'>recipe</h2>
      

    </div>
  )
}
