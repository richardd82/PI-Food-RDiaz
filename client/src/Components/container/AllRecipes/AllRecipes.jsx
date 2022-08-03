import React, { Component, useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../../redux/actions/index.js';
import { RecipesCard } from '../recipesCard/RecipesCard.jsx';


export default function AllRecipes(){

    const dispatch = useDispatch();
    const allRecipies = useSelector((state) => state.recipes)
    console.log(allRecipies)

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch]);

        <div>Recipes</div>
        return(
            <div className='containerRecipes'>
                <h2 className='cardTitle'>View our Recipes</h2>
                <div className='cardContainer'>
                <React.StrictMode>
                {
                    
                    allRecipies.map(r => <RecipesCard
                            key={r.id}      
                            title={r.title}
                            image={r.image}
                        />
                    )
                    
                }
                </React.StrictMode>
                </div>
            </div>

        );
     




}

