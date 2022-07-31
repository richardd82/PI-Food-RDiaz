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
        
        //return res.status(200).json(fullData);
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

        try{
            router.get('/recipes/:id', (req, res) => {
                console.log('Hola mundito');
                res.send('Hola Mundito');
            })
        }catch(e){
            console.log(e);
        }
// router.get('/:id', (req, res) => {
//     res.send('Hola Mundito')
// })
// router.get('/recipes', (req, res) => {
//     res.send('Hola Mundito')
// })



module.exports = router;