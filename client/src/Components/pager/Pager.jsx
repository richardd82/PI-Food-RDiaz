import React from 'react';
import './pager.css'

function Pager({cardsPerPage, allCards, pager}) {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allCards/cardsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return (
        <nav>
            <ul className='paginationContainer'>
                { pageNumbers &&
                pageNumbers.map(number => (
                    <li className='number' key={number}>
                        <label className='labelNumber' onClick={() => pager(number)}>{number}</label>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
};

export default Pager;