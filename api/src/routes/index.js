require('dotenv').config({path: '../.env'});
const Router = require('express');
const recipesRoute = require('./routeRecipes.js');
const dietsRoute = require('./routeTypes.js');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/', recipesRoute);
router.use('/diets', dietsRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/', function(req, res) {
//     res.send('!Hola Mundo!')   
//   })

module.exports = router;
