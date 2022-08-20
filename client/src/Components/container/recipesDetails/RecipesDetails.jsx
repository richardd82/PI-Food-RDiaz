import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../../redux/actions";
import "./recipesDetails.css";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Loading from "../../loading/loading";

export default function RecipesDetails() {
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getRecipeById(id));
	}, [id, dispatch]);
	let arr = useSelector((state) => state.recipeDetail);
	// let obj = useSelector((state) => state.recipeDetail);
	// Comprobar si la info viene de la Api o de la DB
	//[0].id + ' ID DE BASE DE DATOS ==========> ' + id + ' ID DEL DISPATCH'
	//let arrID =arr.map(e => e.id);
	//console.log(arrID)
	let obj = {};

	//[0]?.id === id  arr[0]?.id
	// if(arr[0]?.id){
	if (arr[0]?.id.includes("-")) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]?.id === id) {
				obj = arr[i];
			}			
		}
	}
	else{
		obj = arr;
	}

	console.log(obj);

	if (Object.keys(arr).length === 0 && obj.id !== id)
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	else {
		return (
			<>
				<Header />
				<div className="detailsContainer">
					<div className="detailTitle">
						<h2 className="cardTitle">{obj.title}</h2>
					</div>
					<div className="felxContainer">
						<div className="div1">
							<img className="imageDetail" src={obj.image} alt="" />
						</div>
						<div className="div2 cardDetailSteps">
							<article className="stepByStep">
								<label className="detailsTitle">How to prepare:</label>
								<ul>
									<li>Time: {obj.minutes} mins.</li>
									<li>Servings: {obj.servings}</li>
									<li className="liSteps ">{obj.steps}</li>
								</ul>
							</article>
						</div>
						<div className="div3 cardDetail">
							<article className="littleDetails">
								<label className="detailsTitle">Dish Types</label>
								<div>{obj.dishTypes}</div>
								<label className="detailsTitle">Diets Types</label>
								<div>{obj.diets}</div>
								<label className="detailsTitle">Health Score</label>
								<div>{obj.healthScore} <p>{obj.like}</p> / 100</div>
							</article>
						</div>
						<div className="div4">
							<label className="detailsTitle">Description</label>
							<div className="summary"> {obj.summary}</div>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}
