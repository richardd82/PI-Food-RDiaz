import React from 'react';
import { Link } from 'react-router-dom';
import './recipesCard.css'
import { Component } from 'react';

export class RecipesCard extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){

        return(
            <div key={this.props.id} >
                <Link to={`recipes/${this.props.id}`} className='card'>
                    <img src={this.props.image} alt="Dish image" />
                    <div className='add-btn'>
                        <button className='watch-btn'>{this.props.title}</button>
                    </div>
                </Link>
            </div>
        )

    }



}