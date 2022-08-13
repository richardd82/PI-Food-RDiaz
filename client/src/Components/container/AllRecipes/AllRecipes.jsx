import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, orderByScore, getByDiet, orderByDiet } from '../../../redux/actions/index.js';
import SearchBar from '../../searchBar/SearchBar.jsx';
import { RecipesCard } from '../recipesCard/RecipesCard.jsx';
import { Link } from 'react-router-dom';
import Pager from '../../pager/Pager'
import './allRecipes.css'





export default function AllRecipes(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    ///////////
    const [order, setOrder] = useState('')
   // {console.log(allDiets)}
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
    useEffect(() => {
        dispatch(getByDiet());
    },[]);

    function handleOrder(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };
    function handleOrderScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };
    function handleOrderDiet(e) {
        e.preventDefault();
        dispatch(orderByDiet(e.target.value))
        // setCurrentPage(1);
        // setOrder(`Ordenado ${e.target.value}`)
    };
    function handleReload(e){
        e.preventDefault();
        dispatch(getAllRecipes());
        setCurrentPage(1);
    };
    

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
                <Link to='/create'>
                    <div>
                        <button className='btnCreate' onClick={e => handleReload(e)}>Create your recipe</button>
                    </div>
                </Link>
                <div>
                    <button className='btnReload' onClick={e => handleReload(e)}>Reload all Recipes</button>
                </div>
                    <SearchBar />
                    
                </div>
                <div className='filtersContainer'>
                <select className='alphabeticalFilter' onChange={e => handleOrder(e)}>
                    <option disabled selected="selected">Order By</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select className='dietsFilter' onChange={e => handleOrderDiet(e)}>
                    <option disabled selected="selected">By Diet Type</option>
                    {
                        allDiets.map((e) => {    
                            return(                            
                            <option value={`${e.name}`} key={e.id}>{e.name}</option>
                            );
                        })
                    }                  
                </select>
                <select className='scoreFilter' onChange={e => handleOrderScore(e)}>
                    <option disabled selected="selected">By Health Score</option>
                    <option value='asc'> - to + </option>
                    <option value='desc'> + to - </option>
                </select>
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

