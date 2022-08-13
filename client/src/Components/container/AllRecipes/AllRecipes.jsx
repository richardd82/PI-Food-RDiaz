import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../../redux/actions/index.js';
import SearchBar from '../../searchBar/SearchBar.jsx';
import { RecipesCard } from '../recipesCard/RecipesCard.jsx';
import { Link } from 'react-router-dom';
import Pager from '../../pager/Pager'





export default function AllRecipes(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    // {console.log(allRecipies)}
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(9)
    const indexLastCard = currentPage * cardsPerPage;
    const indexFirstCard = indexLastCard - cardsPerPage;
    const allCards = allRecipes.slice(indexFirstCard, indexLastCard);
    const pager = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        dispatch(getAllRecipes());
    },[dispatch]);

    

        <div>Recipes</div>
        return(
            <div className='containerRecipes'>
                <h2 className='cardTitle'>View our Recipes</h2>
                <div className='searchbarContainer'>
                <Pager 
                        cardsPerPage={cardsPerPage}
                        allCards={allRecipes.length}
                        pager={pager}
                />
                    <SearchBar />
                    
                </div>
                <div className='cardContainer'>
                <React.StrictMode>
                {                                
                    allCards && allCards?.map((r) => 
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

