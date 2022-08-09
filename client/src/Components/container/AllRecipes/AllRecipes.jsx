import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getRecipesByName } from '../../../redux/actions/index.js';
import SearchBar from '../../searchBar/SearchBar.jsx';
import { RecipesCard } from '../recipesCard/RecipesCard.jsx';
import { Link } from 'react-router-dom';


export default function AllRecipes(){

    const dispatch = useDispatch();
    const allRecipies = useSelector((state) => state.recipes);

    useEffect(() => {
        dispatch(getAllRecipes())
    },[dispatch]);

        <div>Recipes</div>
        return(
            <div className='containerRecipes'>
                <h2 className='cardTitle'>View our Recipes</h2>
                <div className='searchbarContainer'>
                    
                    <SearchBar getRecipesByName={getRecipesByName}/>
                    
                </div>
                <div className='cardContainer'>
                <React.StrictMode>
                {
                    
                   allRecipies && allRecipies.map((r) => 
                    <div key={r.id}>
                        <Link to = {`recipes/${r.id}`}>
                            <RecipesCard
                                key={r.id}      
                                title={r.title}
                                image={r.image}
                            />
                        </Link>
                    </div>
                    )
                    
                }
                </React.StrictMode>
                </div>
            </div>

        );
     




}

