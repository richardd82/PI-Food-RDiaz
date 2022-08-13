const Router = require('express');
const axios = require('axios');
const {Recipes, Types} = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();

const URL = 'https://api.spoonacular.com/recipes/';
//&number=10&addRecipeInformation=true Limitar Api
router.get('/recipes', async (req, res) => {    
    let name = req.query.name;  
        try{    
            
            let getApi = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`);
            if(name){  
                let recipe = getApi.data.results.filter((n) =>
                n.title.toLowerCase().includes(name.toLowerCase())
                );
                console.log(recipe)
            let recipeLength = Object.keys(recipe).length;
            if (recipeLength === 0)
            return res.status(404).json({ message: "Recipe not found" });
            return res.status(200).json(recipe);          
        }
        else{
            const fullData = await getApi.data.results.map(d => {                
                return { 
                    id: d.id,
                    title: d.title,
                    image: d.image,
                    imageType: d.imageType,
                    healthScore: d.healthScore,
                    diets: d.diets
                }
            });
            console.log(fullData)
            res.status(200).json(fullData);
        }
    }catch(e){
        return res.status(404).json({message: e})
            }
        
        //console.log(fullData);
    }); 
    router.get('/recipes/:id', async (req, res) => {
        let id = req.params.id;
        try{
            const getApiId = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`);            
            const dataId = await getApiId.data;
            
           res.status(200).json(
            {
                id: dataId.id,
                image: dataId.image,
                title: dataId.title,
                dishTypes: dataId.dishTypes?.map(d => {return d}),
                healthScore: dataId.healthScore,
                diets: dataId.diets?.map(d => {return d}),
                summary: dataId.summary.replace( /(<([^>]+)>)/ig, ''),
                image: dataId.image,
                steps: dataId.analyzedInstructions[0]?.steps.map((e) => e.step),
                minutes: dataId.readyInMinutes,
                servings: dataId.servings
            }
           );
        }catch(e){
            res.status(400).json({message: e});
        }
    });
/**
 * Form contains 
 * title
 * summary
 * healthScore
 * steps
 * dietsLocal
 */
router.post('/recipes', async (req, res) => {
    const {title, summary, healthScore, analyzedInstructions, idDiets} = req.body;    
    if(!title || !summary){
        res.status(404).json({message: "The name and the summary can't be empty"});
    }
    else if(healthScore < 0 || healthScore > 100){
        res.status(404).json({message: "The score can't be less than 0 or more than 100"});
    }
    else{        
        try{
            const newRecipes = await Recipes.create({
                title,
                summary,
                healthScore,
                analyzedInstructions,
                idDiets        
            });            
            await newRecipes.save();
            newRecipes.addTypes
            return res.status(200).json(newRecipes);
            }catch(e){
                return e
            }
    }   
})

router.get('/', async (req, res) => { 
    res.send('Hola mundito cruel');
});



module.exports = router;
