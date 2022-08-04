import React from 'react';
import './recipesCard.css'
import { Component } from 'react';

export class RecipesCard extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){

        return(
            <div key={this.props.id} className='card'>
                {/* <Link to={`recipes/${this.props.id}`} className='card'> */}
                    <img src={this.props.image} alt="Dish" />
                    <div className='add-btn'>
                        <button className='watch-btn'>{this.props.title}</button>
                    </div>
                {/* </Link> */}
            </div>
        )

    }



}