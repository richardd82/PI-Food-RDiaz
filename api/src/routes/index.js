require('dotenv').config({path: '../.env'});
const Router = require('express');
const recipesRoute = require('./routeRecipes.js');
const recipeID = require('./routeRecipes.js');
//const typesRoute = require('./routeTypes.js');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/', recipesRoute);
router.use('/recipes', recipesRoute);
router.use('/:id', recipeID);
//router.use('/diet', typesRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/', function(req, res) {
//     res.send('!Hola Mundo!')   
//   })

module.exports = router;
