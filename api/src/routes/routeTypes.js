const e = require('express');
const Router = require('express');
const {Recipes, Types} = require('../db.js');
//require('dotenv').config();
const router = Router();

const dietsLocal =  [
    "Gluten Free",
    "Ketogenic",
    "Lacto Ovo Vegetarian",
    "Vegan",
    "Pescatarian",
    "Paleolithic",
    "Primal",
    "Fodmap Friendly",
    "Whole 30",
    "Dairy free"                        
];

router.get('/', async (req, res) => {
    try{
    const diets = dietsLocal.forEach(async (e) => {
        await Types.findOrCreate({ //Ingresa los datos a la tabla si no existen
             where: {name: e} //donde el name sea cada una de las dietas del Array Local
         });
    });        
        const allDiets = await Types.findAll();         
        res.status(200).json(allDiets);

    }catch(e){
        res.status(400).json({message: e})
    }
});




module.exports = router;