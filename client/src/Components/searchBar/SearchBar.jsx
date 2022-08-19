import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName, getAllRecipes } from "../../redux/actions";
import "./searchBar.css";




const SearchBar = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState({ name: " " });

	
  useEffect(() => {
    dispatch(getAllRecipes());
},[dispatch])

	const handleChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getRecipesByName(name));
		setName(" ");
		document.getElementById("searchForm").reset();
	};


	return (
		<div className="inputContainer">
			<div>
				<form id="searchForm">
					<input
						type="text"
						placeholder="Search Recipe"
						onChange={(e) => handleChange(e)}
					/>
					<button
						className="btnSearch"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;
