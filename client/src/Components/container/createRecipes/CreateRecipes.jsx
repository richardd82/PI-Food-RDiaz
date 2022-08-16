import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByDiet, postRecipe } from "../../../redux/actions";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import "./createRecipes.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateRecipes() {
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const allDiets = useSelector((state) => state.diets);
	const history = useHistory();
	const [input, setInput] = useState({
		title: "",
		summary: "",
		healthScore: "",
		analyzedInstructions: [],
		idDiets: [],
		image: "",
	});

	const sendToDB = {
		title: input.title,
		summary: input.summary,
		healthScore: input.healthScore,
		analyzedInstructions: input.analyzedInstructions
			? input.analyzedInstructions.join(",")
			: "",
		idDiets: input.idDiets ? input.idDiets.join(",") : "",
		image: input.image,
	};
	function validation(input) {
		let errors = {};
		//console.log(input.title + ">>>>>>>>>>>>>>>>>>>> VALID")
		// title
		let nameRegex = /^[a-zA-Z]+$/g;
		if (!input.title) errors.title = "Can't be empty";
		else if (!nameRegex.test(input.title)) {
			errors.title = "Only Alphabetic Characters";
		}
		//Summary
		if (!input.summary) errors.summary = "Can't be empty";
		else if (input.summary.length < 20) {
			errors.summary = "Must be more than 20 characters";
		}
		// Image
		var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
		if (!input.image) errors.image = "Image link can't be blank";
		else if (!imgPattern.test(input.image))
			errors.image = "Must be a image link and a jpg or png file";
		// Height
		if (!input.healthScore) errors.healthScore = "The Socre can't be empty";
		else if (input.healthScore <= 0 || input.healthScore > 100)
			errors.healthScore = "Must be between 0 and 100";
		//ListDiets		
		if (!input.idDiets.length) errors.idDiets = "Check almost one option";
		//analyzedInstructions
		if (!input.analyzedInstructions) errors.analyzedInstructions = "Can't be empty";
		else if (input.analyzedInstructions.length < 20) {
			errors.analyzedInstructions = "Must be more than 20 characters";
		}
		return errors;
	}

	function handleChange(e) {
		//console.log(e.target.name + '*************' + e.target.value)
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validation({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		// console.log(input)
	}
	function handleCheck(e) {
		if (e.target.checked) {
			setInput({
				...input,
				idDiets: [...input.idDiets, e.target.value],
			});
		}
	}

	useEffect(() => {
		dispatch(getByDiet());
	}, [dispatch]);

	const [stepList, setStepList] = useState([{ analyzedInstructions: "" }]);
	// console.log(stepList)

	const handleStepAdd = () => {
		//e.preventDefault();
		setStepList([...stepList, { analyzedInstructions: "" }]);
	};
	const handleStepRemove = (index) => {
		//e.preventDefault();
		const list = [...stepList];
		//console.log(index);
		list.splice(index);
		setStepList(list);
	};
	//console.log(...stepList)
	const handleServiceChange = (e, index) => {
		//    e.preventDefault();
		const { name, value } = e.target;
		let list = [...stepList];
		list[index][name] = value;
		console.log(list);
		setStepList(list);
		setInput({
			...input,
			analyzedInstructions: list.map((e) => e.analyzedInstructions),
		});
	};
	function handleSubmit(e) {
		e.preventDefault();
		console.log(
			input.title +
				"==>" +
				input.summary +
				"==>" +
				input.healthScore +
				"==>" +
				input.analyzedInstructions +
				"==>" +
				input.idDiets +
				"==>" +
				input.image
		);
		//if(!Object.entries(errors.length)){
		if (
			input.title.length > 0 &&
			input.summary.length > 20 &&
			input.healthScore > 0 &&
			input.healthScore < 101
		) {
			dispatch(postRecipe(sendToDB));
			
		} else {
			
				<h1>Invalid Data</h1>
			
		}
		
		
		//};
		console.log(input);
		setInput({
			title: "",
			summary: "",
			healthScore: "",
			analyzedInstructions: [],
			idDiets: [],
			image: "",
		});
		setTimeout(() => {
			history.push("/recipes");				
		}, 3000);
		
	}

	return (
		<>
			<Header />

			<div className="containerCreateRecpe">
				<h2 className="cardTitle">Create Your Own Recipe</h2>

				<div>
					<form onSubmit={(e) => handleSubmit(e)} className="containerForm">
						<div className="inputsForm">
							<input
								className="inputNameRecipe"
								type="text"
								name="title"
								value={input.title}
								placeholder="Recipe Name"
								onChange={(e) => handleChange(e)}
							/>
							{/* {console.log(errors.name)} */}
							{errors.title && (<span className="errorTitle errorsMsg">{errors.title}</span>)}
							<label className="lblScore">Health Score</label>
							<input
								className="inputScore"
								type="number"
								name="healthScore"
								value={input.healthScore}
								onChange={(e) => handleChange(e)}
							/>
							{errors.healthScore && (
								<span className="errorScore errorsMsg">{errors.healthScore}</span>
							)}
						</div>
						<div className="textAreaSummary">
							<textarea
								className="textAreaRecipe"
								name="summary"
								value={input.summary}
								cols="60"
								rows="60"
								placeholder="Recipe Description"
								onChange={(e) => handleChange(e)}
							/>
							{errors.summary && (<span className="errorSummary errorsMsg">{errors.summary}</span>)}
						</div>
						<div className="uploadPhoto">
							<div className="divSubmit">
								<button className="btnSubmit" type="submit">
									Create Recipe
								</button>
							</div>
							Upload a photo of your recipe
							<input
								className="btnUploadImg"
								type="text"
								name="image"
								value={input.image}
								onChange={(e) => handleChange(e)}
							/>
							{errors.image && <span className="errorImg errorsMsg">{errors.image}</span>}
						</div>
						<div className="containerListDiet">
							<label className="lblListDiets">Type Diets</label>
							<ul className="listDiets">
								{allDiets.map((e) => {
									return (
										<li key={e.id}>
											<input
												type="checkbox"
												id={e.id}
												className="checkboxDiets"
												name={e.name}
												value={`${e.name}`}
												onChange={(e) => handleCheck(e)}
											/>
											<label htmlFor={e.id}>{e.name}</label>
										</li>
									);
								})}
								{errors.idDiets && (
									<span className="errorDiets errorsMsg">{errors.idDiets}</span>
								)}
							</ul>
						</div>
						<div className="stepsForm">
							<label className="lblSteps">How to cook Step by Step</label>
							<div className="flexSteps">
								{stepList.map((singleStep, index) => (
									<div key={index} className="addStep textAreaAdded">
										{/* {console.log(index)} */}
										<div className="firstDivision">
											<textarea
												className="textAreaSteps"
												name="analyzedInstructions"
												cols="60"
												rows="60"
												placeholder="Step Description"
												value={singleStep.step}
												onChange={(e) => handleServiceChange(e, index)}
											/> {errors.analyzedInstructions && (<span className="errorAnalyzedInstructions errorsMsg">{errors.analyzedInstructions}</span>)}
											<div className="btnsDivisions">
												{stepList.length - 1 === index && stepList.length < 6 && (
													<button
														className="addStepList"
														onClick={handleStepAdd}
													>
														+
													</button>
												)}
												<div className="secondDivision">
													{stepList.length > 1 && (
														<button
															className="delStepList"
															onClick={() => handleStepRemove(index)}
														>
															x
														</button>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
