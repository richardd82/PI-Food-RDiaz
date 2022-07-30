require('dotenv').config({path: '../.env'});
const Router = require('express');
const getData = require('../getData/index');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/', function(req, res) {
//     res.send('!Hola Mundo!')   
//   })
router.get('/', function(req, res) {
  const {id, name, title, image, imageType} = req.body;
  console.log(name + '***********************');
    const fullData = {id, name, title, image, imageType};
    res.send(fullData);   
  })

module.exports = router;
