import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByDiet } from '../../../redux/actions';
import Footer from '../../footer/Footer'
import Header from '../../header/Header'
import './createRecipes.css'

export default function CreateRecipes () {

  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getByDiet());
  },[dispatch]);

  return (
    <>
      <Header />
    
      <div className='containerCreateRecpe'>
        <h2 className='cardTitle'>Create Your Own Recipe</h2>

        <div >
            <form action="" className='containerForm'>
              <div className='inputsForm'>
                <input className='inputNameRecipe' type="text" name="title" placeholder='Recipe Name'/>
                <label className='lblScore'>Health Score</label>
                <input className='inputScore' type="number" name="healthScore" />
              </div>
              <div className='textAreaSummary'>
                <textarea className='textAreaRecipe' name="summary" cols="60" rows="60" placeholder='Recipe Description' /> 
              </div>
              <div className='containerListDiet'>
              <label className='lblListDiets'>Type Diets</label>
                <ul className='listDiets'>
                    {
                        allDiets.map((e) => {    
                          return(             
                            <li key={e.id}>
                              <input type="checkbox" id={e.id} name={e.name} value={`${e.name}`} />
                              <label htmlFor={e.id}>{e.name}</label>                              
                            </li>
                          );
                        })
                    }  
                </ul>                
              </div>
              <div className='stepsForm'>
                <label className='lblSteps'>How to cook Step by Step</label>
                <button className='btnForm'>Add Step</button>
              </div>

            </form>
        </div>
        </div>
      <Footer />
    </>
  )
    
}
