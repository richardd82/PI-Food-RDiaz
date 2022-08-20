import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, orderByName, orderByScore, getByDiet, orderByDiet} from '../../../redux/actions/index.js';
import SearchBar from '../../searchBar/SearchBar.jsx';
import { RecipesCard } from '../recipesCard/RecipesCard.jsx';
import { Link } from 'react-router-dom';
import Pager from '../../pager/Pager'
import './allRecipes.css'
import Loading from '../../loading/loading.jsx';





export default function AllRecipes(){
//console.log(getRecipesByName())
    const dispatch = useDispatch();
    let allRecipes = useSelector((state) => state.recipes);
    let allDiets = useSelector((state) => state.diets);    
    //let filteredRecipes = useSelector((state) => state) 
    // eslint-disable-next-line
    const [order, setOrder] = useState('');
    //const [message, setMessage] = useState(false);
//    {console.log(allRecipes)}
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage] = useState(9)
    const indexLastCard = currentPage * cardsPerPage;
    const indexFirstCard = indexLastCard - cardsPerPage;
    const allCards = allRecipes.slice(indexFirstCard, indexLastCard);
    const pager = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        dispatch(getAllRecipes())        
    },[dispatch]);
    useEffect(() => {
        dispatch(getByDiet());
    },[dispatch]);

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
            
       //if(allDiets.length){allRecipes=allDiets; setMessage(true)}
        // console.log(allRecipes)
       // document.getElementsByClassName('modal').style = '{display: none;}';
       if (Object.keys(allRecipes).length === 0)
       return (
           <>            
            <Loading />            
        </>
        
        );
        else if(!allRecipes?.length){
         // document.getElementsByClassName('modal')[0].style= "{display: flex;}"; 
         
         return (<div className="modal"><h1>Don'ty find</h1></div>)
         //    setTimeout(() => {
         //     }, 3000)
             
         }
    else {
        return(
            <>
            <div className='containerRecipes'>
                <h2 className='cardTitle'>View our Recipes</h2>
                <div className='searchbarContainer'>
                <Pager 
                        cardsPerPage={cardsPerPage}
                        allCards={allRecipes.length}
                        pager={pager}
                />
                    <div>                
                        <a href='/create' className='btnCreate'>Create your recipe</a>                
                    </div>
                <div>
                    <button className='btnReload' onClick={e => handleReload(e)}>Reload all Recipes</button>
                </div>
                    <SearchBar />
                    
                </div>
                <div className='filtersContainer'>
                <select className='alphabeticalFilter' onChange={e => handleOrder(e)}>
                    <option disabled defaultValue="selected">Order By</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                {/* {!allDiets.length &&  "<div>There are no dishes with this type of diet </div>"} */}
                <select className='dietsFilter' onChange={e => handleOrderDiet(e)}>
                    <option disabled defaultValue="selected">By Diet Type</option>
                    {
                        allDiets.map((e) => {    
                            return(                            
                            <option value={`${e.name}`} key={e.id}>{e.name}</option>
                            );
                        })
                    }                  
                </select>
                <select className='scoreFilter' onChange={e => handleOrderScore(e)}>
                    <option disabled defaultValue="selected">By Health Score</option>
                    <option value='asc'> - to + </option>
                    <option value='desc'> + to - </option>
                </select>
                </div>
                <div className='cardContainer'>
                {/* {message && <h2>Don't find Recipes</h2>} */}
                <React.StrictMode>
                {                                
                    allCards && allCards?.map((r) => 
                    <div key={r.id}>
                        <Link to = {`recipes/${r.id}`}>
                            <RecipesCard
                                key={r.id}      
                                title={r.title}
                                image={r.image}
                                diets={r.diets.toString().split(',')}
                                like={r.like}
                                
                            />
                        </Link>
                        {/* {console.log(r.diets)}    */}
                    </div>
                    )
                }
                </React.StrictMode>
                </div>                
            </div>
            </>
        );
    }
}

