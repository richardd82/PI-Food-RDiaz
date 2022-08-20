const Router = require("express");
const axios = require("axios");
const { Recipes, Types } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

const URL = "https://api.spoonacular.com/recipes/";
//&number=10&addRecipeInformation=true Limitar Api

/***********************Get Info from Database ***********************/
const getDbInfo = async () => {
	try {
		let recipesDB = await Recipes.findAll({
			// trae data de la db
			// include: {
			//     model: Diet, //genero la relacion con el modelo Diet
			//     attributes: ['name'], //Me trae toda la data del name de las dietas
			through: {
				attributes: [], //Traigo todo
			},
			// }
		});
		return recipesDB.map((e) => {
			//console.log(recipesDB)
			return objDB = {
				id: e.id,
				title: e.title,
				summary: e.summary,
				healthScore: e.healthScore,
				steps: e.analyzedInstructions,
				diets: e.idDiets,
				image: e.image,
				like: e.like,
			};
		});
	} catch (error) {
		console.log(error);
	}
};
/***********************Get All Info ***********************/
router.get("/recipes", async (req, res) => {
	let name = req.query.name;
	try {
		let getApi = await axios.get(
			`${URL}complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`
		);
		if (name) {
			let recipe = getApi.data.results.filter((n) =>
				n.title.toLowerCase().includes(name.toLowerCase())
			);
			// console.log(recipe);
			let recipeLength = Object.keys(recipe).length;
			if (recipeLength === 0)
				return res.status(404).json({ message: "Recipe not found" });
			return res.status(200).json(recipe);
		} else {
			const fullData = await getApi.data.results.map((d) => {
				return {
					id: d.id,
					title: d.title,
					image: d.image,
					imageType: d.imageType,
					healthScore: d.healthScore,
					diets: d.diets,
				};
			});
			const dbInfo = await getDbInfo();
			console.log(dbInfo);
			const all = fullData.concat(dbInfo);
			//console.log(all + '=============================> ALL DATA');
			res.status(200).json(all);
		}
	} catch (e) {
		return res.status(404).json({ message: e });
	}

	//console.log(fullData);
	const getByDb = async (id) => {
		try {
			const idDb = await Recipes.findByPk(id);

			return {
				id: idDb.id,
				name: idDb.name,
				healthScore: idDb.healthScore,
				diets: idDb.diets,
				summary: idDb.summary,
				steps: idDb.steps,
				image: idDb.image,
				createInDB: idDb.createInDB,
			};
		} catch (error) {
			console.log(error);
		}
	};
});
router.get("/recipes/:id", async (req, res) => {
	let id = req.params.id;
	try {
		if (id.includes("-")) {
			
			const db = await getDbInfo(id);
			//console.log(db)
			res.status(200).json(db);
		} else {
			const getApiId = await axios.get(
				`${URL}${id}/information?apiKey=${API_KEY}`
			);
			// const dbInfo = await getByDb();
			// .concat(dbInfo);
			const dataId = await getApiId.data
			//console.log(dataId.title);

			res.status(200).json({
				id: dataId.id,
				image: dataId.image,
				title: dataId.title,
				dishTypes: dataId.dishTypes?.map((d) => {
					return d;
				}),
				healthScore: dataId.healthScore,
				diets: dataId.diets?.map((d) => {
					return d;
				}),
				summary: dataId.summary.replace(/(<([^>]+)>)/gi, ""),
				image: dataId.image,
				steps: dataId.analyzedInstructions[0]?.steps.map((e) => e.step),
				minutes: dataId.readyInMinutes,
				servings: dataId.servings,
			});
		}
	} catch (e) {
		res.status(400).json({ message: e });
	}
});
router.post("/create", async (req, res) => {
	// console.log(
	// 	req.body.title +
	// 		" ********** " +
	// 		req.body.summary +
	// 		" ********** " +
	// 		req.body.healthScore +
	// 		" ********** " +
	// 		req.body.analyzedInstructions +
	// 		" ********** " +
	// 		req.body.idDiets +
	// 		" ********** " +
	// 		req.body.image +
	// 		" ********** " +
	// 		req.body.like +
	// 		" ********** "
	// );
	console.log(req.body);
	let {
		title,
		summary,
		healthScore,
		analyzedInstructions,
		idDiets,
		image,
		like
	} = req.body;
	if (!title || !summary) {
		res
			.status(404)
			.json({ message: "The name and the summary can't be empty" });
	} else if (healthScore < 0 || healthScore > 100) {
		res
			.status(404)
			.json({ message: "The score can't be less than 0 or more than 100" });
	} else {
		try {
			const newRecipes = await Recipes.create({
				title,
				summary,
				healthScore,
				analyzedInstructions,
				idDiets,
				image,
				like,
			});
			// 	let dbRecipe = await newRecipes.findAll(); // {} => longitud === 0
			// 	let dbRecipeLength = Object.keys(dbRecipe).length;
			// 	if (dbRecipeLength !== 0) {
			// 		let noRepeat = {};
			// 		dbContenido = dbContenido.concat(dbRecipe);
			// 		dbContenido = dbContenido.filter((p) =>
			// 			noRepeat[p.id] ? false : (noRepeat[p.id] = true)
			// 		);
			// 	}
			// 	return res.status(200).send("Recipe Created");
			// } catch (error) {
			// 	return res.status(500).json(console(error));
			// }
			//console.log(newRecipes.title)
			//await newRecipes.save();
			//newRecipes.addTypes
			return res.json(newRecipes);
		} catch (e) {
			return e;
		}
	}
});

router.get("/", async (req, res) => {
	res.send("Hola mundito cruel");
});

module.exports = router;
