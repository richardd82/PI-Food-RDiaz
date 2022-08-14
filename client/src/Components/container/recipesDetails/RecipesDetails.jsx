import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../../redux/actions";
import "./recipesDetails.css";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

export default function RecipesDetails() {
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getRecipeById(id));
	}, [id, dispatch]);
	let {
		image,
		title,
		dishTypes,
		healthScore,
		diets,
		summary,
		steps,
		minutes,
		servings,
	} = useSelector((state) => state.recipeDetail);
	return (
		<>
			<Header />
			<div className="detailsContainer">
				<div className="detailTitle">
					<h2 className="cardTitle">{title}</h2>
				</div>
				<div className="felxContainer">
					<div className="div1">
						<img src={image} alt="" />
					</div>
					<div className="div2 cardDetailSteps">
						<article className="stepByStep">
							<label className="detailsTitle">How to prepare:</label>
							<ul>
								<li>Time: {minutes} mins.</li>
								<li>Servings: {servings}</li>
								<li className="liSteps ">{steps}</li>
							</ul>
						</article>
					</div>
					<div className="div3 cardDetail">
						<article className="littleDetails">
							<label className="detailsTitle">Dish Types</label>
							<div>{dishTypes}</div>
							<label className="detailsTitle">Diets Types</label>
							<div>{diets}</div>
							<label className="detailsTitle">Health Score</label>
							<div>{healthScore} / 100</div>
						</article>
					</div>
					<div className="div4">
						<label className="detailsTitle">Description</label>
						<div className="summary"> {summary}</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
