import React from "react";
import "./recipesCard.css";
import { Component } from "react";

export class RecipesCard extends Component {
	render() {
        {var diets = this.props.diets.toString().split(",").join(" | ")
            console.log(diets)
        }
		return (
			<>
					<div className="containerTypeDiet">
						<ul>                            
							<li><span>{diets}</span></li>
						</ul>
					</div>
				<div key={this.props.id} className="card">
					<div className="containerImg">
						<img src={this.props.image} alt="Dish" />
					</div>
					<div className="add-btn">
						<button className="watch-btn">{this.props.title}</button>
					</div>
				</div>
			</>
		);
	}
}
