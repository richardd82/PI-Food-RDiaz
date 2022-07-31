const Router = require('express');
const axios = require('axios');
const {Recipes, Types} = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();
// try{
//     router.get('/', (req, res) => {
//         console.log('Hola mundito');
//         res.send('Hola Mundito');
//     })
// }catch(e){
//     console.log(e);
// }
const URL = 'https://api.spoonacular.com/recipes/';

    router.get('/recipes', async (req, res) => {    
        try{    
        const getApi = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true`);
        const fullData = await getApi.data.results.map(d => {                
            return { 
                id: d.id,
                title: d.title,
                image: d.image,
                imageType: d.imageType
            }
        });
        res.status(200).json(fullData);
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
  
// router.get('/:id', (req, res) => { https://api.spoonacular.com/recipes/{id}/information
//     res.send('Hola Mundito')
// })
router.get('/', (req, res) => {
    res.send('Hola Mundito')
})



module.exports = router;